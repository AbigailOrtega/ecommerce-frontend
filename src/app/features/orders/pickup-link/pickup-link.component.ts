import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '@core/services/order.service';
import { Order } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { PickupActions, PickupManageComponent } from '@shared/components/pickup-manage/pickup-manage.component';

/**
 * The page of the link in the pickup emails (/recoleccion/:orderNumber?t=token): reschedule or
 * cancel without an account. The token is the permission, so the page is only loaded in the
 * browser (never rendered or cached on the server) and sends the token in a header.
 */
@Component({
  selector: 'app-pickup-link',
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule, DatePipe, LoadingComponent, PickupManageComponent],
  template: `
    <div class="container pickup-link">
      <h1>Tu recolección</h1>
      @if (loading) {
        <app-loading />
      } @else if (order) {
        <mat-card class="summary" data-testid="pickup-summary">
          <p class="order-number">Pedido <strong>#{{ order.orderNumber }}</strong></p>
          <p><mat-icon>store</mat-icon> {{ order.pickupLocationName }}</p>
          @if (order.pickupDate) {
            <p><mat-icon>event</mat-icon>
              <span [class.struck]="order.pickupCancelled">{{ order.pickupDate | date:'EEEE dd/MM/yyyy':'UTC':'es-MX' }}</span>
              @if (order.pickupTimeSlotLabel && !order.pickupCancelled) { · {{ order.pickupTimeSlotLabel }} }
              @if (order.pickupCancelled) { <span class="tag">Cancelada</span> }
            </p>
          }
        </mat-card>
        @if (finalStatus) {
          <p class="final">Este pedido ya está {{ finalStatus }}; su recolección ya no se puede cambiar.</p>
        } @else {
          <app-pickup-manage [order]="order" [actions]="actions" (orderChange)="order = $event" />
        }
      } @else {
        <mat-card class="invalid" data-testid="pickup-invalid">
          <h2>Este enlace no funciona</h2>
          <p>Puede que esté incompleto. Ábrelo de nuevo desde el correo de tu pedido, o
            <a routerLink="/contacto">escríbenos</a> y te ayudamos a cambiar tu recolección.</p>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .pickup-link { max-width: 640px; padding-top: 24px; padding-bottom: 48px; }
    .summary { padding: 16px 20px; }
    .summary p { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
    .summary mat-icon { color: rgba(0,0,0,0.55); }
    .order-number { color: rgba(0,0,0,0.7); }
    .struck { text-decoration: line-through; color: rgba(0,0,0,0.5); }
    .tag { background: #ffebee; color: #b71c1c; border-radius: 999px; padding: 1px 10px; font-size: 0.8rem; }
    .final { color: rgba(0,0,0,0.7); }
    .invalid { padding: 20px; }
  `],
})
export class PickupLinkComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly orders = inject(OrderService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  order: Order | null = null;
  loading = true;
  private orderNumber = '';
  private token = '';

  readonly actions: PickupActions = {
    reschedule: (date, slotId) => this.orders.reschedulePickupWithToken(this.orderNumber, this.token, date, slotId),
    cancel: () => this.orders.cancelPickupWithToken(this.orderNumber, this.token),
  };

  get finalStatus(): string | null {
    return ({ CANCELLED: 'cancelado', DELIVERED: 'entregado', REFUNDED: 'reembolsado' } as Record<string, string>)[this.order?.status ?? ''] ?? null;
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;   // keeps loading=true on the server: nothing personal in the HTML
    this.orderNumber = this.route.snapshot.paramMap.get('orderNumber') ?? '';
    this.token = this.route.snapshot.queryParamMap.get('t') ?? '';
    if (!this.token) { this.loading = false; return; }
    this.orders.getPickupWithToken(this.orderNumber, this.token).subscribe({
      next: res => { this.order = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
