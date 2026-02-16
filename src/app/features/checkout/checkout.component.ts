import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatStepperModule, MatRadioModule, MatSnackBarModule, CurrencyPipe],
  template: `
    <div class="container checkout-container">
      <h1>Checkout</h1>

      <mat-stepper linear #stepper>
        <mat-step [stepControl]="shippingForm" label="Shipping">
          <form [formGroup]="shippingForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Address</mat-label>
              <input matInput formControlName="shippingAddress">
            </mat-form-field>
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>City</mat-label>
                <input matInput formControlName="shippingCity">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>State</mat-label>
                <input matInput formControlName="shippingState">
              </mat-form-field>
            </div>
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>ZIP Code</mat-label>
                <input matInput formControlName="shippingZipCode">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Country</mat-label>
                <input matInput formControlName="shippingCountry">
              </mat-form-field>
            </div>
            <button mat-raised-button color="primary" matStepperNext [disabled]="shippingForm.invalid">
              Continue to Payment
            </button>
          </form>
        </mat-step>

        <mat-step label="Payment">
          <form [formGroup]="paymentForm">
            <h3>Select Payment Method</h3>
            <mat-radio-group formControlName="paymentMethod" class="payment-options">
              <mat-radio-button value="stripe">Credit/Debit Card (Stripe)</mat-radio-button>
              <mat-radio-button value="paypal">PayPal</mat-radio-button>
              <mat-radio-button value="cod">Cash on Delivery</mat-radio-button>
            </mat-radio-group>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Order Notes (optional)</mat-label>
              <textarea matInput formControlName="notes" rows="3"></textarea>
            </mat-form-field>

            <div class="step-actions">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-raised-button color="primary" matStepperNext [disabled]="paymentForm.invalid">
                Review Order
              </button>
            </div>
          </form>
        </mat-step>

        <mat-step label="Review & Place Order">
          <mat-card class="order-summary">
            <h3>Order Summary</h3>
            @for (item of cart.items(); track item.id) {
              <div class="summary-item">
                <span>{{ item.product.name }} x {{ item.quantity }}</span>
                <span>{{ item.subtotal | currency }}</span>
              </div>
            }
            <hr>
            <div class="summary-item total">
              <span>Total</span>
              <span>{{ cart.total() | currency }}</span>
            </div>
          </mat-card>

          <div class="step-actions">
            <button mat-button matStepperPrevious>Back</button>
            <button mat-raised-button color="primary" (click)="placeOrder()" [disabled]="loading">
              {{ loading ? 'Placing Order...' : 'Place Order' }}
            </button>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .checkout-container { max-width: 700px; }
    .full-width { width: 100%; }
    .row { display: flex; gap: 16px; }
    .row mat-form-field { flex: 1; }
    .payment-options { display: flex; flex-direction: column; gap: 12px; margin: 16px 0 24px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }
    .order-summary { margin: 16px 0; padding: 16px; }
    .summary-item { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-item.total { font-weight: 700; font-size: 1.1rem; }
  `],
})
export class CheckoutComponent implements OnInit {
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public cart: CartService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.shippingForm = this.fb.group({
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingState: ['', Validators.required],
      shippingZipCode: ['', Validators.required],
      shippingCountry: ['', Validators.required],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['stripe', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.cart.loadCart();
  }

  placeOrder(): void {
    this.loading = true;
    const request = {
      ...this.shippingForm.value,
      ...this.paymentForm.value,
    };

    this.orderService.createOrder(request).subscribe({
      next: (res) => {
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 5000 });
        this.router.navigate(['/orders', res.data.orderNumber]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Order failed', 'Close', { duration: 5000 });
      },
    });
  }
}
