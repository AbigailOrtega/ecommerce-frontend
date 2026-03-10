import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="auth-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Forgot Password</mat-card-title>
          <mat-card-subtitle>Enter your email to receive a reset link.</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          @if (!submitted) {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email">
                @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                  <mat-error>Email is required</mat-error>
                }
                @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                  <mat-error>Invalid email</mat-error>
                }
              </mat-form-field>
              <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="loading">
                {{ loading ? 'Sending...' : 'Send Reset Link' }}
              </button>
            </form>
          } @else {
            <p class="success-message">If an account with that email exists, a reset link has been sent.</p>
          }
        </mat-card-content>
        <mat-card-actions align="end">
          <p><a routerLink="/login">Back to Sign In</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 24px;
    }
    mat-card {
      max-width: 420px;
      width: 100%;
      padding: 24px;
    }
    .full-width { width: 100%; }
    mat-card-actions p { margin: 0; font-size: 0.9rem; }
    mat-card-actions a { color: #3f51b5; font-weight: 500; }
    .success-message { color: #388e3c; font-size: 0.95rem; }
  `],
})
export class ForgotPasswordComponent {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.forgotPassword(this.form.value.email).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 5000 });
      },
    });
  }
}
