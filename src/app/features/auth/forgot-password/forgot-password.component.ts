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
          <mat-card-title>Olvidé mi contraseña</mat-card-title>
          <mat-card-subtitle>Ingresa tu correo para recibir un enlace de recuperación.</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          @if (!submitted) {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Correo electrónico</mat-label>
                <input matInput formControlName="email" type="email">
                @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                  <mat-error>El correo es requerido</mat-error>
                }
                @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                  <mat-error>Correo inválido</mat-error>
                }
              </mat-form-field>
              <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="loading">
                {{ loading ? 'Enviando...' : 'Enviar enlace' }}
              </button>
            </form>
          } @else {
            <p class="success-message">Si existe una cuenta con ese correo, recibirás un enlace de recuperación.</p>
          }
        </mat-card-content>
        <mat-card-actions align="end">
          <p><a routerLink="/login">Volver a iniciar sesión</a></p>
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
    mat-card-actions a { color: var(--theme-primary); font-weight: 500; }
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
        this.snackBar.open('Algo salió mal. Por favor intenta de nuevo.', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
