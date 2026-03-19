import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('newPassword');
  const confirm = control.get('confirmPassword');
  if (!password || !confirm) return null;
  return password.value === confirm.value ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="auth-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Restablecer contraseña</mat-card-title>
          <mat-card-subtitle>Ingresa tu nueva contraseña.</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          @if (!token) {
            <p class="error-message">Token inválido o faltante. Por favor solicita un nuevo enlace.</p>
          } @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nueva contraseña</mat-label>
                <input matInput formControlName="newPassword" [type]="hidePassword ? 'password' : 'text'">
                <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                  <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (form.get('newPassword')?.hasError('required') && form.get('newPassword')?.touched) {
                  <mat-error>La contraseña es requerida</mat-error>
                }
                @if (form.get('newPassword')?.hasError('minlength') && form.get('newPassword')?.touched) {
                  <mat-error>La contraseña debe tener al menos 8 caracteres</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Confirmar contraseña</mat-label>
                <input matInput formControlName="confirmPassword" [type]="hideConfirm ? 'password' : 'text'">
                <button mat-icon-button matSuffix type="button" (click)="hideConfirm = !hideConfirm">
                  <mat-icon>{{ hideConfirm ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (form.get('confirmPassword')?.touched && form.hasError('passwordsMismatch')) {
                  <mat-error>Las contraseñas no coinciden</mat-error>
                }
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="loading">
                {{ loading ? 'Updating...' : 'Restablecer contraseña' }}
              </button>
            </form>
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
    .error-message { color: #c62828; font-size: 0.95rem; }
  `],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token: string | null = null;
  loading = false;
  hidePassword = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordsMatchValidator },
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit(): void {
    if (this.form.invalid || !this.token) return;
    this.loading = true;
    this.auth.resetPassword(this.token, this.form.value.newPassword).subscribe({
      next: () => {
        this.snackBar.open('Contraseña actualizada exitosamente.', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Token inválido o expirado.', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
