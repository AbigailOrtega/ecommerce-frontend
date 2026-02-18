import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { PaymentService } from '@core/services/payment.service';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatStepperModule, MatRadioModule, MatSnackBarModule, MatProgressSpinnerModule, CurrencyPipe],
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

            @if (paymentForm.get('paymentMethod')?.value === 'stripe') {
              <mat-card class="card-form">
                <h4>Card Details</h4>
                @if (stripeLoading) {
                  <div class="stripe-loading">
                    <mat-spinner diameter="24"></mat-spinner>
                    <span>Loading payment form...</span>
                  </div>
                }
                <div #stripeElement></div>
                @if (stripeError) {
                  <p class="stripe-error">{{ stripeError }}</p>
                }
              </mat-card>
            }

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Order Notes (optional)</mat-label>
              <textarea matInput formControlName="notes" rows="3"></textarea>
            </mat-form-field>

            <div class="step-actions">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-raised-button color="primary" matStepperNext [disabled]="!isPaymentStepValid()">
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

          @if (processingPayment) {
            <div class="processing-overlay">
              <mat-spinner diameter="40"></mat-spinner>
              <span>Processing payment...</span>
            </div>
          }

          <div class="step-actions">
            <button mat-button matStepperPrevious [disabled]="loading">Back</button>
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
    .card-form { margin-bottom: 24px; padding: 16px; }
    .card-form h4 { margin: 0 0 16px; }
    .processing-overlay { display: flex; align-items: center; gap: 16px; margin: 16px 0; padding: 16px; background: #f5f5f5; border-radius: 8px; }
    .stripe-loading { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .stripe-error { color: #d32f2f; margin-top: 8px; font-size: 0.875rem; }
  `],
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('stripeElement') stripeElementRef!: ElementRef;

  shippingForm: FormGroup;
  paymentForm: FormGroup;
  loading = false;
  processingPayment = false;
  stripeLoading = false;
  stripeError: string | null = null;
  stripeReady = false;
  private savedOrderNumber: string | null = null;

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private clientSecret: string | null = null;
  private paymentIntentId: string | null = null;
  private stripeMountRequested = false;
  private stripeMounted = false;

  constructor(
    private fb: FormBuilder,
    public cart: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService,
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

    this.paymentForm.get('paymentMethod')!.valueChanges.subscribe(method => {
      if (method !== 'stripe') {
        this.destroyStripeElement();
      }
    });
  }

  ngOnInit(): void {
    this.cart.loadCart();
  }

  ngAfterViewChecked(): void {
    // Mount when the #stripeElement div appears in the DOM and we haven't mounted yet
    if (
      this.stripeElementRef?.nativeElement &&
      !this.stripeMounted &&
      !this.stripeMountRequested &&
      this.paymentForm.get('paymentMethod')?.value === 'stripe'
    ) {
      this.initStripeElement();
    }
  }

  ngOnDestroy(): void {
    this.destroyStripeElement();
  }

  private initStripeElement(): void {
    this.stripeMountRequested = true;
    this.stripeLoading = true;
    this.stripeError = null;

    // First load Stripe (fetches config + initializes SDK).
    // Only create a PaymentIntent if the SDK loaded successfully.
    this.paymentService.getStripe().pipe(
      switchMap(stripe => {
        this.stripe = stripe;
        if (!this.stripe) {
          throw new Error('Stripe is not configured. Please use another payment method.');
        }
        return this.paymentService.createPaymentIntent(this.cart.total());
      }),
    ).subscribe({
      next: (intent) => {
        this.clientSecret = intent.data.clientSecret;
        this.paymentIntentId = intent.data.paymentIntentId;
        this.stripeLoading = false;

        if (!this.clientSecret || !this.stripeElementRef?.nativeElement) {
          this.stripeError = 'Failed to initialize payment form.';
          return;
        }

        this.elements = this.stripe!.elements({ clientSecret: this.clientSecret });
        console.log(this.elements)
        console.log("ELEMENTS")
        const paymentElement = this.elements.create('payment');
        paymentElement.mount(this.stripeElementRef.nativeElement);
        this.stripeMounted = true;
        paymentElement.on('ready', () => {
          this.stripeReady = true;
        });
        paymentElement.on('change', (event: any) => {
          this.stripeError = event.error?.message ?? null;
        });
      },
      error: (err) => {
        this.stripeLoading = false;
        this.stripeMountRequested = false;
        this.stripeError = err.error?.message || err.message || 'Failed to load payment form.';
      },
    });
  }

  private destroyStripeElement(): void {
    this.elements = null;
    this.stripeReady = false;
    this.clientSecret = null;
    this.stripeMounted = false;
    this.stripeMountRequested = false;
  }

  isPaymentStepValid(): boolean {
    if (this.paymentForm.get('paymentMethod')?.value === 'stripe') {
      return this.stripeReady;
    }
    return this.paymentForm.valid;
  }

  placeOrder(): void {
    this.loading = true;
    const method = this.paymentForm.get('paymentMethod')?.value;

    if (method === 'stripe') {
      this.processStripePayment();
    } else {
      this.submitOrder();
    }
  }

  private processStripePayment(): void {
    if (!this.stripe || !this.elements || !this.paymentIntentId) {
      this.snackBar.open('Payment form not ready. Please wait and try again.', 'Close', { duration: 5000 });
      this.loading = false;
      return;
    }

    // 1. Create the order FIRST so it exists when the webhook arrives
    this.submitOrder(this.paymentIntentId, () => this.confirmStripePayment());
  }

  private async confirmStripePayment(): Promise<void> {
    this.processingPayment = true;

    const { error, paymentIntent } = await this.stripe!.confirmPayment({
      elements: this.elements!,
      confirmParams: {
        return_url: window.location.origin + '/orders',
      },
      redirect: 'if_required',
    });

    this.processingPayment = false;

    if (error) {
      this.loading = false;
      this.snackBar.open(error.message || 'Payment failed. Your order will be updated automatically.', 'Close', { duration: 5000 });
      this.router.navigate(['/orders', this.savedOrderNumber]);
    } else if (paymentIntent) {
      if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing' || paymentIntent.status === 'requires_capture') {
        const msg = paymentIntent.status === 'succeeded'
          ? 'Order placed successfully!'
          : 'Payment is being processed. Your order will be confirmed shortly.';
        this.snackBar.open(msg, 'Close', { duration: 5000 });
        this.router.navigate(['/orders', this.savedOrderNumber]);
      } else {
        this.loading = false;
        this.snackBar.open('Payment was not completed. Please try again.', 'Close', { duration: 5000 });
      }
    } else {
      this.loading = false;
      this.snackBar.open('Payment was not completed. Please try again.', 'Close', { duration: 5000 });
    }
  }

  private submitOrder(paymentId?: string, onOrderCreated?: () => void): void {
    const request = {
      ...this.shippingForm.value,
      paymentMethod: this.paymentForm.get('paymentMethod')?.value,
      notes: this.paymentForm.get('notes')?.value,
      ...(paymentId && { paymentId }),
    };

    this.orderService.createOrder(request).subscribe({
      next: (res) => {
        if (onOrderCreated) {
          // For Stripe: order created, now confirm payment (webhook will update status)
          this.savedOrderNumber = res.data.orderNumber;
          onOrderCreated();
        } else {
          this.snackBar.open('Order placed successfully!', 'Close', { duration: 5000 });
          this.router.navigate(['/orders', res.data.orderNumber]);
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Order failed', 'Close', { duration: 5000 });
      },
    });
  }
}
