import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatCardModule, CurrencyPipe],
  template: `
    <div class="container confirmation-container">
      <mat-card class="confirmation-card">
        <mat-icon class="success-icon">check_circle</mat-icon>
        <h1>¡Pedido confirmado!</h1>

        @if (orderNumber) {
          <p class="order-number">Pedido <strong>#{{ orderNumber }}</strong></p>
        }

        @if (email) {
          <p class="email-notice">Enviamos la confirmación a <strong>{{ email }}</strong></p>
        }

        @if (total) {
          <p class="total-notice">Total: <strong>{{ total | currency }}</strong></p>
        }

        <p class="hint">Revisa tu bandeja de entrada para los detalles de tu pedido.</p>

        <div class="actions">
          <a mat-raised-button color="primary" routerLink="/register">Crear cuenta</a>
          <a mat-stroked-button routerLink="/">Seguir comprando</a>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .confirmation-container { max-width: 560px; margin: 48px auto; padding: 16px; }
    .confirmation-card { text-align: center; padding: 48px 32px; }
    .success-icon { font-size: 72px; width: 72px; height: 72px; color: #2e7d32; margin-bottom: 16px; }
    h1 { margin: 0 0 16px; }
    .order-number { font-size: 1.1rem; color: #333; margin: 8px 0; }
    .email-notice { color: #555; margin: 8px 0; }
    .total-notice { color: #333; font-size: 1.05rem; margin: 8px 0; }
    .hint { color: #888; font-size: 0.9rem; margin: 16px 0 32px; }
    .actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
  `],
})
export class OrderConfirmationComponent implements OnInit {
  orderNumber: string | null = null;
  email: string | null = null;
  total: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras?.state
      ?? history.state;
    if (state) {
      this.orderNumber = state['orderNumber'] ?? null;
      this.email = state['email'] ?? null;
      this.total = state['total'] ?? null;
    }
  }
}
