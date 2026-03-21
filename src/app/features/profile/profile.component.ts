import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatListModule, MatButtonModule, RouterLink],
  template: `
    <div class="container profile-container">
      <h1>Mi Perfil</h1>

      @if (auth.user(); as user) {
        <mat-card>
          <div class="profile-header">
            <mat-icon class="avatar-icon">account_circle</mat-icon>
            <div>
              <h2>{{ user.firstName }} {{ user.lastName }}</h2>
              <p>{{ user.email }}</p>
            </div>
          </div>

          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon>email</mat-icon>
              <span matListItemTitle>Correo</span>
              <span matListItemLine>{{ user.email }}</span>
            </mat-list-item>
            @if (user.phone) {
              <mat-list-item>
                <mat-icon matListItemIcon>phone</mat-icon>
                <span matListItemTitle>Teléfono</span>
                <span matListItemLine>{{ user.phone }}</span>
              </mat-list-item>
            }
            @if (auth.isAdmin()) {
              <mat-list-item>
                <mat-icon matListItemIcon>badge</mat-icon>
                <span matListItemTitle>Rol</span>
                <span matListItemLine>{{ user.role }}</span>
              </mat-list-item>
            }
          </mat-list>

          <div class="profile-actions">
            <a mat-raised-button color="primary" routerLink="/orders">
              <mat-icon>receipt_long</mat-icon> Mis Pedidos
            </a>
            <button mat-raised-button color="warn" (click)="auth.logout()">
              <mat-icon>logout</mat-icon> Cerrar sesión
            </button>
          </div>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .profile-container { max-width: 600px; }
    mat-card { padding: 24px; }
    .profile-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    .avatar-icon { font-size: 64px; width: 64px; height: 64px; color: var(--theme-primary); }
    .profile-header h2 { margin: 0; }
    .profile-header p { color: #666; margin: 4px 0 0; }
    .profile-actions { display: flex; gap: 12px; margin-top: 24px; }
  `],
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
