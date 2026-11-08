import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';

/** Items, coupon, shipping and total of the order being placed (checkout step "Revisar y Confirmar"). */
@Component({
  selector: 'app-checkout-summary',
  imports: [MatCardModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="order-summary">
      <h3>Resumen del pedido</h3>
      @if (auth.isLoggedIn()) {
        @for (item of cart.items(); track item.id) {
          <div class="summary-item">
            <span>{{ item.product.name }} x {{ item.quantity }}</span>
            <span>{{ item.subtotal | currency }}</span>
          </div>
        }
      } @else {
        @for (item of cart.localItems(); track item.tempId) {
          <div class="summary-item">
            <span>{{ item.productName }} x {{ item.quantity }}</span>
            <span>{{ item.subtotal | currency }}</span>
          </div>
        }
      }
      <hr>
      <div class="summary-item">
        <span>Subtotal</span>
        <span>{{ cart.subtotal() | currency }}</span>
      </div>
      @if (cart.coupon(); as coupon) {
        <div class="summary-item discount-row">
          <span>Cupón ({{ coupon.code }}) {{ coupon.discountPercent }}% desc.</span>
          <span>-{{ cart.discount() | currency }}</span>
        </div>
      }
      <div class="summary-item">
        <span>Envío ({{ shippingLabel() }})</span>
        @if (freeShipping()) {
          <span class="free-shipping-label">Gratis</span>
        } @else {
          <span>{{ shippingCost() | currency }}</span>
        }
      </div>
      <div class="summary-item total">
        <span>Total</span>
        <span>{{ total() | currency }}</span>
      </div>
    </mat-card>
  `,
  styles: [`
    .order-summary { margin: 16px 0; padding: 16px; }
    .summary-item { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-item.total { font-weight: 700; font-size: 1.1rem; }
    .discount-row { color: #2e7d32; font-size: 0.9rem; }
    .free-shipping-label { color: #2e7d32; font-weight: 600; }
  `],
})
export class CheckoutSummaryComponent {
  protected readonly cart = inject(CartService);
  protected readonly auth = inject(AuthService);

  readonly shippingLabel = input.required<string>();
  readonly shippingCost = input.required<number>();
  readonly freeShipping = input(false);
  readonly total = input.required<number>();
}
