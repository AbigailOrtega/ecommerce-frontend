import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="auth-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Iniciar sesión</mat-card-title>
          <mat-card-subtitle>¡Bienvenido! Por favor inicia sesión para continuar.</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
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

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'">
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (form.get('password')?.hasError('required') && form.get('password')?.touched) {
                <mat-error>La contraseña es requerida</mat-error>
              }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="loading">
              {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
            </button>
            <p class="forgot-link"><a routerLink="/forgot-password">¿Olvidaste tu contraseña?</a></p>
          </form>
        </mat-card-content>
        <mat-card-actions align="end">
          <p>¿No tienes cuenta? <a routerLink="/register">Regístrate</a></p>
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
    .forgot-link { margin-top: 8px; font-size: 0.9rem; text-align: right; }
    .forgot-link a { color: var(--theme-primary); }
  `],
})
export class LoginComponent {
  form: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('¡Sesión iniciada!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Error al iniciar sesión', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
