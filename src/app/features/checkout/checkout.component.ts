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
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { PaymentService } from '@core/services/payment.service';
import { ShippingService } from '@core/services/shipping.service';
import { PickupLocation, PickupTimeSlot, ShippingConfig, ShippingRatesResponse, SkydropxRate } from '@shared/models';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatStepperModule, MatRadioModule, MatSnackBarModule, MatProgressSpinnerModule,
    MatIconModule, CurrencyPipe, DecimalPipe],
  template: `
    <div class="container checkout-container">
      <h1>Checkout</h1>

      <mat-stepper linear #stepper>

        <!-- ── Step 1: Tipo de Envío ── -->
        <mat-step [stepControl]="typeForm" label="Tipo de Envío">
          <form [formGroup]="typeForm">
            <h3 class="section-label">¿Cómo deseas recibir tu pedido?</h3>

            @if (loadingConfig) {
              <p class="hint">Cargando opciones de envío...</p>
            } @else {
              <div class="type-options">
                @if (shippingConfig?.nationalEnabled) {
                  <div class="type-card" [class.selected]="typeForm.get('shippingType')?.value === 'NATIONAL'"
                       (click)="selectType('NATIONAL')">
                    <span class="type-icon">📦</span>
                    <div class="type-info">
                      <strong>Envío Nacional</strong>
                      <span>Precio calculado según distancia</span>
                    </div>
                  </div>
                }
                @if (shippingConfig?.pickupEnabled) {
                  <div class="type-card" [class.selected]="typeForm.get('shippingType')?.value === 'PICKUP'"
                       (click)="selectType('PICKUP')">
                    <span class="type-icon">🏪</span>
                    <div class="type-info">
                      <strong>Pick Up</strong>
                      <span>Retira en uno de nuestros puntos · {{ shippingConfig?.pickupCost | currency }}</span>
                    </div>
                  </div>
                }
              </div>
            }

            <button mat-raised-button color="primary" matStepperNext [disabled]="typeForm.invalid">
              Continuar
            </button>
          </form>
        </mat-step>

        <!-- ── Step 2: Detalles de Entrega ── -->
        <mat-step [stepControl]="deliveryForm" label="Detalles de Entrega">
          <form [formGroup]="deliveryForm">

            @if (typeForm.get('shippingType')?.value === 'NATIONAL') {
              <h3 class="section-label">Dirección de entrega</h3>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Dirección</mat-label>
                <input matInput formControlName="shippingAddress">
              </mat-form-field>
              <div class="row">
                <mat-form-field appearance="outline">
                  <mat-label>Ciudad</mat-label>
                  <input matInput formControlName="shippingCity">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Estado</mat-label>
                  <input matInput formControlName="shippingState">
                </mat-form-field>
              </div>
              <div class="row">
                <mat-form-field appearance="outline">
                  <mat-label>Código Postal</mat-label>
                  <input matInput formControlName="shippingZipCode">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>País</mat-label>
                  <input matInput formControlName="shippingCountry">
                </mat-form-field>
              </div>

              <button mat-stroked-button color="primary" type="button"
                      (click)="calculateShipping()"
                      [disabled]="!isAddressReady() || calculatingShipping">
                @if (calculatingShipping) {
                  <mat-spinner diameter="18" style="display:inline-block;margin-right:8px;"></mat-spinner>
                }
                Ver opciones de envío
              </button>

              @if (shippingCalcError) {
                <p class="calc-error">{{ shippingCalcError }}</p>
              }

              <!-- Skydropx: rate selector -->
              @if (shippingRates?.skydropxAvailable && shippingRates!.rates.length > 0) {
                <div class="rates-list">
                  @for (rate of shippingRates!.rates; track rate.id) {
                    <div class="rate-card" [class.rate-selected]="selectedSkydropxRate?.id === rate.id"
                         (click)="selectRate(rate)">
                      <div class="rate-carrier">{{ rate.carrier }}</div>
                      <div class="rate-service">{{ rate.service }}</div>
                      @if (rate.estimatedDays) {
                        <div class="rate-days">{{ rate.estimatedDays }} día(s)</div>
                      }
                      <div class="rate-price">{{ rate.price | currency }}</div>
                    </div>
                  }
                </div>
              }

              <!-- Flat/Google Maps result -->
              @if (shippingRates && !shippingRates.skydropxAvailable) {
                <div class="calc-result">
                  <mat-icon>location_on</mat-icon>
                  <span>
                    @if (shippingRates.distanceKm > 0) {
                      {{ shippingRates.distanceKm | number:'1.1-1' }} km —
                    }
                    Envío: <strong>{{ shippingRates.flatPrice | currency }}</strong>
                  </span>
                </div>
              }
            }

            @if (typeForm.get('shippingType')?.value === 'PICKUP') {
              <h3 class="section-label">Selecciona punto de retiro</h3>

              @if (loadingLocations) {
                <p class="hint">Cargando puntos de retiro...</p>
              } @else {
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Punto de retiro</mat-label>
                  <mat-select formControlName="pickupLocationId" (selectionChange)="onLocationChange($event.value)">
                    @for (loc of pickupLocations; track loc.id) {
                      <mat-option [value]="loc.id">{{ loc.name }} — {{ loc.city }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>

                @if (deliveryForm.get('pickupLocationId')?.value) {
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Horario</mat-label>
                    <mat-select formControlName="pickupTimeSlotId">
                      @for (slot of availableSlots; track slot.id) {
                        <mat-option [value]="slot.id">{{ slot.label }}</mat-option>
                      }
                    </mat-select>
                  </mat-form-field>
                }

                <div class="calc-result">
                  <mat-icon>store</mat-icon>
                  <span>Costo de Pick Up: <strong>{{ shippingConfig?.pickupCost | currency }}</strong></span>
                </div>
              }
            }

            <div class="step-actions">
              <button mat-button matStepperPrevious>Atrás</button>
              <button mat-raised-button color="primary" matStepperNext [disabled]="!isDeliveryStepValid()">
                Continuar al Pago
              </button>
            </div>
          </form>
        </mat-step>

        <!-- ── Step 3: Revisar y Confirmar ── -->
        <mat-step label="Revisar y Confirmar">
          <mat-card class="order-summary">
            <h3>Resumen del pedido</h3>
            @for (item of cart.items(); track item.id) {
              <div class="summary-item">
                <span>{{ item.product.name }} x {{ item.quantity }}</span>
                <span>{{ item.subtotal | currency }}</span>
              </div>
            }
            <hr>
            <div class="summary-item">
              <span>Subtotal</span>
              <span>{{ cart.subtotal() | currency }}</span>
            </div>
            @if (cart.coupon()) {
              <div class="summary-item discount-row">
                <span>Cupón ({{ cart.coupon()!.code }}) {{ cart.coupon()!.discountPercent }}% desc.</span>
                <span>-{{ cart.discount() | currency }}</span>
              </div>
            }
            <div class="summary-item">
              <span>Envío ({{ shippingLabel }})</span>
              <span>{{ shippingCostForSummary | currency }}</span>
            </div>
            <div class="summary-item total">
              <span>Total</span>
              <span>{{ totalWithShipping | currency }}</span>
            </div>
          </mat-card>

          <div class="step-actions">
            <button mat-button matStepperPrevious>Atrás</button>
            <button mat-raised-button color="primary" matStepperNext>
              Continuar al Pago
            </button>
          </div>
        </mat-step>

        <!-- ── Step 4: Pago ── -->
        <mat-step label="Pago">
          <form [formGroup]="paymentForm">
            <h3>Selecciona método de pago</h3>
            <mat-radio-group formControlName="paymentMethod" class="payment-options">
              <mat-radio-button value="stripe">Tarjeta de crédito/débito (Stripe)</mat-radio-button>
              <mat-radio-button value="paypal">PayPal</mat-radio-button>
              <mat-radio-button value="cod">Pago contra entrega</mat-radio-button>
            </mat-radio-group>

            @if (paymentForm.get('paymentMethod')?.value === 'stripe') {
              <mat-card class="card-form">
                <h4>Datos de la tarjeta</h4>
                @if (stripeLoading) {
                  <div class="stripe-loading">
                    <mat-spinner diameter="24"></mat-spinner>
                    <span>Cargando formulario de pago...</span>
                  </div>
                }
                <div #stripeElement></div>
                @if (stripeError) {
                  <p class="stripe-error">{{ stripeError }}</p>
                }
              </mat-card>
            }

            @if (paymentForm.get('paymentMethod')?.value === 'paypal') {
              <mat-card class="card-form">
                <h4>PayPal</h4>
                @if (paypalLoading) {
                  <div class="stripe-loading">
                    <mat-spinner diameter="24"></mat-spinner>
                    <span>Cargando PayPal...</span>
                  </div>
                }
                <div #paypalButtonContainer></div>
                @if (paypalError) {
                  <p class="stripe-error">{{ paypalError }}</p>
                }
              </mat-card>
            }

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Notas del pedido (opcional)</mat-label>
              <textarea matInput formControlName="notes" rows="3"></textarea>
            </mat-form-field>

            @if (processingPayment) {
              <div class="processing-overlay">
                <mat-spinner diameter="40"></mat-spinner>
                <span>Procesando pago...</span>
              </div>
            }

            <div class="step-actions">
              <button mat-button matStepperPrevious>Atrás</button>
              <button mat-raised-button color="primary" (click)="placeOrder()"
                      [disabled]="loading || !isPaymentStepValid()">
                {{ loading ? 'Procesando...' : 'Realizar Pedido' }}
              </button>
            </div>
          </form>
        </mat-step>

      </mat-stepper>
    </div>
  `,
  styles: [`
    .checkout-container { max-width: 700px; }
    .full-width { width: 100%; }
    .row { display: flex; gap: 16px; }
    .row mat-form-field { flex: 1; }
    .section-label { margin: 16px 0 12px; font-size: 1rem; color: #333; }
    .hint { color: #888; font-size: 0.9rem; margin: 8px 0 16px; }
    .type-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .type-card { display: flex; align-items: center; gap: 16px; padding: 16px; border: 2px solid #ddd; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
    .type-card:hover { border-color: #3f51b5; background: #f8f9ff; }
    .type-card.selected { border-color: #3f51b5; background: #f0f2ff; }
    .type-icon { font-size: 2rem; }
    .type-info { display: flex; flex-direction: column; }
    .type-info strong { font-size: 1rem; }
    .type-info span { font-size: 0.85rem; color: #666; margin-top: 2px; }
    .calc-result { display: flex; align-items: center; gap: 8px; margin: 16px 0; padding: 12px 16px; background: #e8f5e9; border-radius: 8px; color: #2e7d32; font-size: 0.95rem; }
    .rates-list { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
    .rate-card { display: grid; grid-template-columns: 1fr 1fr auto auto; align-items: center; gap: 8px; padding: 12px 16px; border: 2px solid #e0e0e0; border-radius: 10px; cursor: pointer; transition: border-color 0.15s; font-size: 0.9rem; }
    .rate-card:hover { border-color: #3f51b5; background: #f8f9ff; }
    .rate-card.rate-selected { border-color: #3f51b5; background: #e8eaf6; }
    .rate-carrier { font-weight: 600; color: #1a1a2e; }
    .rate-service { color: #555; font-size: 0.85rem; }
    .rate-days { color: #888; font-size: 0.82rem; white-space: nowrap; }
    .rate-price { font-weight: 700; color: #3f51b5; white-space: nowrap; text-align: right; }
    .calc-error { color: #d32f2f; font-size: 0.875rem; margin-top: 8px; }
    .payment-options { display: flex; flex-direction: column; gap: 12px; margin: 16px 0 24px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }
    .order-summary { margin: 16px 0; padding: 16px; }
    .summary-item { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-item.total { font-weight: 700; font-size: 1.1rem; }
    .discount-row { color: #2e7d32; font-size: 0.9rem; }
    .card-form { margin-bottom: 24px; padding: 16px; }
    .card-form h4 { margin: 0 0 16px; }
    .processing-overlay { display: flex; align-items: center; gap: 16px; margin: 16px 0; padding: 16px; background: #f5f5f5; border-radius: 8px; }
    .stripe-loading { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .stripe-error { color: #d32f2f; margin-top: 8px; font-size: 0.875rem; }
  `],
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('stripeElement') stripeElementRef!: ElementRef;
  @ViewChild('paypalButtonContainer') paypalButtonContainerRef!: ElementRef;

  typeForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;

  shippingConfig: ShippingConfig | null = null;
  loadingConfig = true;
  pickupLocations: PickupLocation[] = [];
  loadingLocations = false;
  availableSlots: PickupTimeSlot[] = [];

  shippingRates: ShippingRatesResponse | null = null;
  selectedSkydropxRate: SkydropxRate | null = null;
  calculatingShipping = false;
  shippingCalcError: string | null = null;

  loading = false;
  processingPayment = false;
  stripeLoading = false;
  stripeError: string | null = null;
  stripeReady = false;
  paypalLoading = false;
  paypalError: string | null = null;
  paypalReady = false;
  private savedOrderNumber: string | null = null;
  private paypalMountRequested = false;
  private paypalMounted = false;

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private clientSecret: string | null = null;
  private paymentIntentId: string | null = null;
  private stripeMountRequested = false;
  private stripeMounted = false;

  get shippingCostForSummary(): number {
    const type = this.typeForm.get('shippingType')?.value;
    if (type === 'NATIONAL') {
      if (this.shippingRates?.skydropxAvailable) return this.selectedSkydropxRate?.price ?? 0;
      return this.shippingRates?.flatPrice ?? 0;
    }
    if (type === 'PICKUP') return this.shippingConfig?.pickupCost ?? 0;
    return 0;
  }

  get shippingLabel(): string {
    const type = this.typeForm.get('shippingType')?.value;
    if (type === 'NATIONAL') {
      if (this.selectedSkydropxRate) {
        return this.selectedSkydropxRate.carrier + ' – ' + this.selectedSkydropxRate.service;
      }
      return 'Envío Nacional';
    }
    if (type === 'PICKUP') {
      const locId = this.deliveryForm.get('pickupLocationId')?.value;
      const loc = this.pickupLocations.find(l => l.id === locId);
      return loc ? 'Pick Up – ' + loc.name : 'Pick Up';
    }
    return '';
  }

  get totalWithShipping(): number {
    return this.cart.total() + this.shippingCostForSummary;
  }

  constructor(
    private fb: FormBuilder,
    public cart: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private shippingService: ShippingService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.typeForm = this.fb.group({
      shippingType: [null, Validators.required],
    });

    this.deliveryForm = this.fb.group({
      shippingAddress: [''],
      shippingCity: [''],
      shippingState: [''],
      shippingZipCode: [''],
      shippingCountry: [''],
      pickupLocationId: [null],
      pickupTimeSlotId: [null],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['stripe', Validators.required],
      notes: [''],
    });

    this.paymentForm.get('paymentMethod')!.valueChanges.subscribe(method => {
      if (method !== 'stripe') this.destroyStripeElement();
      if (method !== 'paypal') this.destroyPayPalButtons();
    });
  }

  ngOnInit(): void {
    this.cart.loadCart();
    this.shippingService.getConfig().subscribe({
      next: (res) => {
        this.shippingConfig = res.data;
        this.loadingConfig = false;
      },
      error: () => this.loadingConfig = false,
    });
  }

  ngAfterViewChecked(): void {
    if (this.stripeElementRef?.nativeElement && !this.stripeMounted && !this.stripeMountRequested
        && this.paymentForm.get('paymentMethod')?.value === 'stripe') {
      this.initStripeElement();
    }
    if (this.paypalButtonContainerRef?.nativeElement && !this.paypalMounted && !this.paypalMountRequested
        && this.paymentForm.get('paymentMethod')?.value === 'paypal') {
      this.initPayPalButtons();
    }
  }

  ngOnDestroy(): void {
    this.destroyStripeElement();
    this.destroyPayPalButtons();
  }

  selectType(type: string): void {
    this.typeForm.patchValue({ shippingType: type });
    this.shippingRates = null;
    this.selectedSkydropxRate = null;
    this.shippingCalcError = null;

    if (type === 'PICKUP' && this.pickupLocations.length === 0) {
      this.loadingLocations = true;
      this.shippingService.getPickupLocations().subscribe({
        next: (res) => {
          this.pickupLocations = res.data;
          this.loadingLocations = false;
        },
        error: () => this.loadingLocations = false,
      });
    }

    // Reset delivery form validators based on type
    const addressFields = ['shippingAddress', 'shippingCity', 'shippingCountry'];
    const pickupFields = ['pickupLocationId', 'pickupTimeSlotId'];

    if (type === 'NATIONAL') {
      addressFields.forEach(f => this.deliveryForm.get(f)?.setValidators(Validators.required));
      pickupFields.forEach(f => this.deliveryForm.get(f)?.clearValidators());
    } else {
      addressFields.forEach(f => this.deliveryForm.get(f)?.clearValidators());
      pickupFields.forEach(f => this.deliveryForm.get(f)?.setValidators(Validators.required));
    }
    [...addressFields, ...pickupFields].forEach(f => this.deliveryForm.get(f)?.updateValueAndValidity());
  }

  onLocationChange(locationId: number): void {
    const loc = this.pickupLocations.find(l => l.id === locationId);
    this.availableSlots = loc ? loc.timeSlots.filter(s => s.active) : [];
    this.deliveryForm.patchValue({ pickupTimeSlotId: null });
  }

  isAddressReady(): boolean {
    const v = this.deliveryForm.value;
    return !!(v.shippingAddress?.trim() && v.shippingCity?.trim() && v.shippingCountry?.trim());
  }

  calculateShipping(): void {
    if (!this.isAddressReady()) return;
    this.calculatingShipping = true;
    this.shippingCalcError = null;
    this.shippingRates = null;
    this.selectedSkydropxRate = null;
    const v = this.deliveryForm.value;
    this.shippingService.calculateNational(
      v.shippingAddress, v.shippingCity, v.shippingState, v.shippingZipCode, v.shippingCountry
    ).subscribe({
      next: (res) => {
        this.shippingRates = res.data;
        this.calculatingShipping = false;
        // Auto-select if only one rate
        if (res.data.skydropxAvailable && res.data.rates.length === 1) {
          this.selectedSkydropxRate = res.data.rates[0];
        }
      },
      error: (err) => {
        this.calculatingShipping = false;
        this.shippingCalcError = err.error?.message || 'No se pudo calcular el costo de envío.';
      },
    });
  }

  selectRate(rate: SkydropxRate): void {
    this.selectedSkydropxRate = rate;
  }

  isDeliveryStepValid(): boolean {
    const type = this.typeForm.get('shippingType')?.value;
    if (type === 'NATIONAL') {
      if (!this.isAddressReady() || !this.shippingRates) return false;
      if (this.shippingRates.skydropxAvailable) return !!this.selectedSkydropxRate;
      return true;
    }
    if (type === 'PICKUP') {
      return !!(this.deliveryForm.get('pickupLocationId')?.value &&
                this.deliveryForm.get('pickupTimeSlotId')?.value);
    }
    return false;
  }

  private initStripeElement(): void {
    this.stripeMountRequested = true;
    this.stripeLoading = true;
    this.stripeError = null;

    this.paymentService.getStripe().pipe(
      switchMap(stripe => {
        this.stripe = stripe;
        if (!this.stripe) throw new Error('Stripe is not configured. Please use another payment method.');
        return this.paymentService.createPaymentIntent(this.totalWithShipping);
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
        const paymentElement = this.elements.create('payment');
        paymentElement.mount(this.stripeElementRef.nativeElement);
        this.stripeMounted = true;
        paymentElement.on('ready', () => { this.stripeReady = true; });
        paymentElement.on('change', (event: any) => { this.stripeError = event.error?.message ?? null; });
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
    const method = this.paymentForm.get('paymentMethod')?.value;
    if (method === 'stripe') return this.stripeReady;
    if (method === 'paypal') return this.paypalReady;
    return this.paymentForm.valid;
  }

  private initPayPalButtons(): void {
    this.paypalMountRequested = true;
    this.paypalLoading = true;
    this.paypalError = null;

    this.paymentService.getPayPalConfig().subscribe({
      next: (res) => {
        const clientId = res.data.clientId;
        if (!clientId) {
          this.paypalLoading = false;
          this.paypalError = 'PayPal is not configured.';
          this.paypalMountRequested = false;
          return;
        }
        this.paymentService.loadPayPalSdk(clientId).then(() => {
          this.paypalLoading = false;
          this.renderPayPalButtons();
        }).catch(() => {
          this.paypalLoading = false;
          this.paypalError = 'Failed to load PayPal SDK.';
          this.paypalMountRequested = false;
        });
      },
      error: () => {
        this.paypalLoading = false;
        this.paypalError = 'Failed to get PayPal configuration.';
        this.paypalMountRequested = false;
      },
    });
  }

  private renderPayPalButtons(): void {
    const paypal = (window as any).paypal;
    if (!paypal || !this.paypalButtonContainerRef?.nativeElement) {
      this.paypalError = 'PayPal SDK not available.';
      return;
    }

    paypal.Buttons({
      createOrder: (_data: any, _actions: any) => {
        return new Promise<string>((resolve, reject) => {
          this.paymentService.createPayPalOrder(this.totalWithShipping).subscribe({
            next: (res) => resolve(res.data.orderId),
            error: (err) => reject(err),
          });
        });
      },
      onApprove: (data: any, _actions: any) => {
        this.processingPayment = true;
        this.paymentService.capturePayPalOrder(data.orderID).subscribe({
          next: (res) => {
            const captureId = res.data.captureId || res.data.orderId;
            this.submitOrder(captureId, () => {
              const orderNumber = this.savedOrderNumber!;
              this.paymentService.confirmPayPalPayment(orderNumber, captureId).subscribe({
                next: () => {
                  this.processingPayment = false;
                  this.cart.resetLocalCart();
                  this.snackBar.open('¡Pedido realizado con éxito!', 'Cerrar', { duration: 5000 });
                  this.router.navigate(['/orders', orderNumber]);
                },
                error: () => {
                  this.processingPayment = false;
                  this.cart.resetLocalCart();
                  this.snackBar.open('¡Pedido realizado con éxito!', 'Cerrar', { duration: 5000 });
                  this.router.navigate(['/orders', orderNumber]);
                },
              });
            });
          },
          error: (err) => {
            this.processingPayment = false;
            this.snackBar.open(err.error?.message || 'Error al procesar PayPal', 'Cerrar', { duration: 5000 });
          },
        });
      },
      onError: (err: any) => {
        this.paypalError = 'El pago con PayPal falló. Intenta de nuevo.';
        console.error('PayPal error:', err);
      },
    }).render(this.paypalButtonContainerRef.nativeElement);

    this.paypalMounted = true;
    this.paypalReady = true;
  }

  private destroyPayPalButtons(): void {
    this.paypalReady = false;
    this.paypalMounted = false;
    this.paypalMountRequested = false;
    this.paypalError = null;
  }

  placeOrder(): void {
    this.loading = true;
    const method = this.paymentForm.get('paymentMethod')?.value;
    if (method === 'stripe') {
      this.processStripePayment();
    } else if (method === 'paypal') {
      this.loading = false;
    } else {
      this.submitOrder();
    }
  }

  private processStripePayment(): void {
    if (!this.stripe || !this.elements || !this.paymentIntentId) {
      this.snackBar.open('Formulario de pago no listo. Espera e intenta de nuevo.', 'Cerrar', { duration: 5000 });
      this.loading = false;
      return;
    }
    this.submitOrder(this.paymentIntentId, () => this.confirmStripePayment());
  }

  private async confirmStripePayment(): Promise<void> {
    this.processingPayment = true;
    const { error, paymentIntent } = await this.stripe!.confirmPayment({
      elements: this.elements!,
      confirmParams: { return_url: window.location.origin + '/orders' },
      redirect: 'if_required',
    });
    this.processingPayment = false;
    if (error) {
      this.loading = false;
      this.cart.resetLocalCart();
      this.snackBar.open(error.message || 'Pago fallido. Tu pedido se actualizará automáticamente.', 'Cerrar', { duration: 5000 });
      this.router.navigate(['/orders', this.savedOrderNumber]);
    } else if (paymentIntent) {
      if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing' || paymentIntent.status === 'requires_capture') {
        const msg = paymentIntent.status === 'succeeded'
          ? '¡Pedido realizado con éxito!'
          : 'El pago está siendo procesado. Tu pedido se confirmará en breve.';
        this.cart.resetLocalCart();
        this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
        this.router.navigate(['/orders', this.savedOrderNumber]);
      } else {
        this.loading = false;
        this.snackBar.open('El pago no se completó. Intenta de nuevo.', 'Cerrar', { duration: 5000 });
      }
    } else {
      this.loading = false;
      this.snackBar.open('El pago no se completó. Intenta de nuevo.', 'Cerrar', { duration: 5000 });
    }
  }

  private submitOrder(paymentId?: string, onOrderCreated?: () => void): void {
    const type = this.typeForm.get('shippingType')?.value;
    const couponCode = this.cart.coupon()?.code;
    const v = this.deliveryForm.value;

    let request: any = {
      paymentMethod: this.paymentForm.get('paymentMethod')?.value,
      notes: this.paymentForm.get('notes')?.value,
      shippingType: type,
      ...(paymentId && { paymentId }),
      ...(couponCode && { couponCode }),
    };

    if (type === 'NATIONAL') {
      request = {
        ...request,
        shippingAddress: v.shippingAddress,
        shippingCity: v.shippingCity,
        shippingState: v.shippingState,
        shippingZipCode: v.shippingZipCode,
        shippingCountry: v.shippingCountry,
        ...(this.selectedSkydropxRate && { skydropxRateId: this.selectedSkydropxRate.id }),
      };
    } else if (type === 'PICKUP') {
      request = {
        ...request,
        pickupLocationId: v.pickupLocationId,
        pickupTimeSlotId: v.pickupTimeSlotId,
      };
    }

    this.orderService.createOrder(request).subscribe({
      next: (res) => {
        if (onOrderCreated) {
          this.savedOrderNumber = res.data.orderNumber;
          onOrderCreated();
        } else {
          this.cart.resetLocalCart();
          this.snackBar.open('¡Pedido realizado con éxito!', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/orders', res.data.orderNumber]);
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Error al realizar el pedido', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
