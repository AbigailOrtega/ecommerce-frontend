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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CurrencyPipe, DecimalPipe, SlicePipe } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { PaymentService } from '@core/services/payment.service';
import { ShippingService } from '@core/services/shipping.service';
import { AuthService } from '@core/services/auth.service';
import { GuestOrderItemRequest, GuestOrderRequest, PickupAvailability, PickupLocation, ShippingConfig, ShippingRatesResponse, SkydropxRate } from '@shared/models';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatStepperModule, MatRadioModule, MatSnackBarModule, MatProgressSpinnerModule,
    MatIconModule, MatDatepickerModule, CurrencyPipe, DecimalPipe, SlicePipe],
  template: `
    <div class="container checkout-container">
      <h1>Checkout</h1>

      <!-- Guest info card (shown only when not logged in) -->
      @if (!authService.isLoggedIn()) {
        <mat-card class="guest-card">
          <h3 class="section-label">Tus datos de contacto</h3>
          <form [formGroup]="guestForm">
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="guestFirstName">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Apellido</mat-label>
                <input matInput formControlName="guestLastName">
              </mat-form-field>
            </div>
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Correo electrónico</mat-label>
                <input matInput formControlName="guestEmail" type="email">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Teléfono (opcional)</mat-label>
                <input matInput formControlName="guestPhone">
              </mat-form-field>
            </div>
          </form>
        </mat-card>
      }

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

              @if (hasFreeShipping) {
                <div class="free-shipping-notice">
                  <mat-icon>local_shipping</mat-icon>
                  <span>¡Tu pedido tiene <strong>envío gratis</strong>!</span>
                </div>
              } @else {
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

                <!-- Skydropx: estándar / express -->
                @if (shippingRates?.skydropxAvailable && shippingRates!.rates.length > 0) {
                  <div class="rates-list">
                    @if (standardRate) {
                      <div class="rate-card" [class.rate-selected]="selectedSkydropxRate?.id === standardRate.id"
                           (click)="selectRate(standardRate)">
                        <div class="rate-info">
                          <mat-icon>local_shipping</mat-icon>
                          <div>
                            <div class="rate-carrier">Envío estándar</div>
                            @if (standardRate.estimatedDays) {
                              <div class="rate-days">{{ standardRate.estimatedDays }} día(s)</div>
                            }
                          </div>
                        </div>
                        <div class="rate-price">{{ standardRate.price | currency }}</div>
                      </div>
                    }
                    @if (expressRate && expressRate.id !== standardRate?.id) {
                      <div class="rate-card" [class.rate-selected]="selectedSkydropxRate?.id === expressRate.id"
                           (click)="selectRate(expressRate)">
                        <div class="rate-info">
                          <mat-icon>bolt</mat-icon>
                          <div>
                            <div class="rate-carrier">Envío express</div>
                            @if (expressRate.estimatedDays) {
                              <div class="rate-days">{{ expressRate.estimatedDays }} día(s)</div>
                            }
                          </div>
                        </div>
                        <div class="rate-price">{{ expressRate.price | currency }}</div>
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
                  @if (loadingDates) {
                    <p class="hint">Cargando fechas disponibles...</p>
                  } @else {
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Fecha de recolección</mat-label>
                      <input matInput [matDatepicker]="picker"
                             formControlName="pickupDate"
                             [matDatepickerFilter]="dateFilter"
                             [min]="today"
                             (dateChange)="onPickupDateChange($event.value)">
                      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                      <mat-datepicker #picker></mat-datepicker>
                    </mat-form-field>

                    @if (loadingSlots) {
                      <p class="hint">Cargando horarios disponibles...</p>
                    }

                    @if (!loadingSlots && availableSlots.length > 1) {
                      <div class="slot-selector">
                        <p class="slot-selector-label">Selecciona un horario:</p>
                        @for (slot of availableSlots; track slot.id) {
                          <div class="slot-option"
                               [class.slot-selected]="selectedSlotId === slot.id"
                               (click)="selectSlot(slot)">
                            <mat-icon>schedule</mat-icon>
                            <span>{{ slot.startTime | slice:0:5 }} – {{ slot.endTime | slice:0:5 }}</span>
                          </div>
                        }
                      </div>
                    }

                    @if (selectedTimeLabel) {
                      <div class="calc-result slot-info">
                        <mat-icon>schedule</mat-icon>
                        <span>Horario: <strong>{{ selectedTimeLabel }}</strong></span>
                      </div>
                    }
                  }
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
            @if (authService.isLoggedIn()) {
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
            @if (cart.coupon()) {
              <div class="summary-item discount-row">
                <span>Cupón ({{ cart.coupon()!.code }}) {{ cart.coupon()!.discountPercent }}% desc.</span>
                <span>-{{ cart.discount() | currency }}</span>
              </div>
            }
            <div class="summary-item">
              <span>Envío ({{ shippingLabel }})</span>
              @if (shippingCostForSummary === 0 && typeForm.get('shippingType')?.value === 'NATIONAL' && shippingConfig?.freeShippingEnabled) {
                <span class="free-shipping-label">Gratis</span>
              } @else {
                <span>{{ shippingCostForSummary | currency }}</span>
              }
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
            </mat-radio-group>

            @if (paymentForm.get('paymentMethod')?.value === 'stripe') {
              <mat-card class="card-form">
                <h4>Datos de la tarjeta</h4>
                @if (!authService.isLoggedIn() && guestForm.invalid) {
                  <p class="guest-paypal-hint">
                    Completa tus datos de contacto (nombre y correo) para activar el pago con tarjeta.
                  </p>
                } @else {
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
                }
              </mat-card>
            }

            @if (paymentForm.get('paymentMethod')?.value === 'paypal') {
              <mat-card class="card-form">
                <h4>PayPal</h4>
                @if (!authService.isLoggedIn() && guestForm.invalid) {
                  <p class="guest-paypal-hint">
                    Completa tus datos de contacto (nombre y correo) para activar el pago con PayPal.
                  </p>
                } @else {
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
    .guest-card { margin-bottom: 24px; padding: 16px 24px; }
    .type-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .type-card { display: flex; align-items: center; gap: 16px; padding: 16px; border: 2px solid #ddd; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
    .type-card:hover { border-color: var(--theme-primary); background: rgba(0,0,0,0.03); }
    .type-card.selected { border-color: var(--theme-primary); background: rgba(0,0,0,0.06); }
    .type-icon { font-size: 2rem; }
    .type-info { display: flex; flex-direction: column; }
    .type-info strong { font-size: 1rem; }
    .type-info span { font-size: 0.85rem; color: #666; margin-top: 2px; }
    .calc-result { display: flex; align-items: center; gap: 8px; margin: 16px 0; padding: 12px 16px; background: #e8f5e9; border-radius: 8px; color: #2e7d32; font-size: 0.95rem; }
    .slot-info { background: #e3f2fd; color: #1565c0; }
    .rates-list { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
    .rate-card { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border: 2px solid #e0e0e0; border-radius: 10px; cursor: pointer; transition: border-color 0.15s; font-size: 0.9rem; }
    .rate-card:hover { border-color: var(--theme-primary); background: rgba(0,0,0,0.03); }
    .rate-card.rate-selected { border-color: var(--theme-primary); background: rgba(0,0,0,0.06); }
    .rate-info { display: flex; align-items: center; gap: 10px; }
    .rate-info mat-icon { color: var(--theme-primary); }
    .rate-carrier { font-weight: 600; color: #1a1a2e; }
    .rate-days { color: #888; font-size: 0.82rem; }
    .rate-price { font-weight: 700; color: var(--theme-primary); white-space: nowrap; }
    .calc-error { color: #d32f2f; font-size: 0.875rem; margin-top: 8px; }
    .payment-options { display: flex; flex-direction: column; gap: 12px; margin: 16px 0 24px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }
    .order-summary { margin: 16px 0; padding: 16px; }
    .summary-item { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-item.total { font-weight: 700; font-size: 1.1rem; }
    .discount-row { color: #2e7d32; font-size: 0.9rem; }
    .free-shipping-label { color: #2e7d32; font-weight: 600; }
    .free-shipping-notice { display: flex; align-items: center; gap: 10px; background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: 8px; padding: 12px 16px; margin-top: 12px; color: #2e7d32; font-size: 0.95rem; }
    .free-shipping-notice mat-icon { color: #2e7d32; flex-shrink: 0; }
    .card-form { margin-bottom: 24px; padding: 16px; }
    .card-form h4 { margin: 0 0 16px; }
    .processing-overlay { display: flex; align-items: center; gap: 16px; margin: 16px 0; padding: 16px; background: #f5f5f5; border-radius: 8px; }
    .stripe-loading { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .stripe-error { color: #d32f2f; margin-top: 8px; font-size: 0.875rem; }
    .guest-paypal-hint { color: #e65100; background: #fff3e0; border-radius: 8px; padding: 10px 14px; font-size: 0.875rem; margin: 0; }
    .slot-selector { margin: 0 0 16px; }
    .slot-selector-label { margin: 0 0 8px; font-size: 0.9rem; color: #555; }
    .slot-option { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 8px; cursor: pointer; font-size: 0.95rem; transition: all 0.15s; }
    .slot-option:hover { border-color: var(--theme-primary); background: rgba(0,0,0,0.03); }
    .slot-option.slot-selected { border-color: var(--theme-primary); background: rgba(0,0,0,0.06); font-weight: 600; }
  `],
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('stripeElement') stripeElementRef!: ElementRef;
  @ViewChild('paypalButtonContainer') paypalButtonContainerRef!: ElementRef;

  guestForm: FormGroup;
  typeForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;

  shippingConfig: ShippingConfig | null = null;
  loadingConfig = true;
  pickupLocations: PickupLocation[] = [];
  loadingLocations = false;
  loadingDates = false;

  availableDates = new Set<string>();
  availableSlots: PickupAvailability[] = [];
  selectedSlotId: number | null = null;
  loadingSlots = false;
  selectedTimeLabel = '';
  today = new Date();

  shippingRates: ShippingRatesResponse | null = null;
  standardRate: SkydropxRate | null = null;
  expressRate: SkydropxRate | null = null;
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
      const cfg = this.shippingConfig;
      if (cfg?.freeShippingEnabled && cfg?.freeShippingMinAmount != null
          && this.cart.total() >= cfg.freeShippingMinAmount) {
        return 0;
      }
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
    public authService: AuthService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private shippingService: ShippingService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.guestForm = this.fb.group({
      guestFirstName: ['', Validators.required],
      guestLastName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      guestPhone: [''],
    });

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
      pickupDate: [null],
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
        && this.paymentForm.get('paymentMethod')?.value === 'stripe'
        && (this.authService.isLoggedIn() || this.guestForm.valid)) {
      this.initStripeElement();
    }
    if (this.paypalButtonContainerRef?.nativeElement && !this.paypalMounted && !this.paypalMountRequested
        && this.paymentForm.get('paymentMethod')?.value === 'paypal'
        && (this.authService.isLoggedIn() || this.guestForm.valid)) {
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
    this.standardRate = null;
    this.expressRate = null;
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

    const addressFields = ['shippingAddress', 'shippingCity', 'shippingCountry'];
    const pickupFields = ['pickupLocationId', 'pickupDate'];

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
    this.availableDates = new Set<string>();
    this.availableSlots = [];
    this.selectedSlotId = null;
    this.selectedTimeLabel = '';
    this.deliveryForm.patchValue({ pickupDate: null });

    if (!locationId) return;

    this.loadingDates = true;
    const from = this.toIsoDate(new Date());
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 60);
    const to = this.toIsoDate(toDate);

    this.orderService.getPickupAvailableDates(locationId, from, to).subscribe({
      next: (res) => {
        this.availableDates = new Set(res.data);
        this.loadingDates = false;
      },
      error: () => this.loadingDates = false,
    });
  }

  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const iso = this.toIsoDate(d);
    return this.availableDates.has(iso);
  };

  onPickupDateChange(date: Date | null): void {
    this.availableSlots = [];
    this.selectedSlotId = null;
    this.selectedTimeLabel = '';

    if (!date) return;
    const locationId = this.deliveryForm.get('pickupLocationId')?.value;
    if (!locationId) return;

    const iso = this.toIsoDate(date);
    this.loadingSlots = true;

    this.orderService.getPickupSlotsForDate(locationId, iso).subscribe({
      next: (res) => {
        this.availableSlots = res.data;
        this.loadingSlots = false;
        if (this.availableSlots.length === 1) {
          this.selectSlot(this.availableSlots[0]);
        }
      },
      error: () => { this.loadingSlots = false; },
    });
  }

  selectSlot(slot: PickupAvailability): void {
    this.selectedSlotId = slot.id;
    this.selectedTimeLabel = `${slot.startTime.slice(0, 5)} – ${slot.endTime.slice(0, 5)}`;
  }

  private toIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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
    this.standardRate = null;
    this.expressRate = null;
    const v = this.deliveryForm.value;
    this.shippingService.calculateNational(
      v.shippingAddress, v.shippingCity, v.shippingState, v.shippingZipCode, v.shippingCountry
    ).subscribe({
      next: (res) => {
        this.shippingRates = res.data;
        this.calculatingShipping = false;
        if (res.data.skydropxAvailable && res.data.rates.length > 0) {
          const sorted = [...res.data.rates].sort((a, b) => a.price - b.price);
          this.standardRate = sorted[0];
          const byDays = [...res.data.rates].filter(r => r.estimatedDays != null).sort((a, b) => a.estimatedDays! - b.estimatedDays!);
          this.expressRate = byDays.length > 0 ? byDays[0] : sorted[sorted.length - 1];
          this.selectedSkydropxRate = this.standardRate;
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

  get hasFreeShipping(): boolean {
    const cfg = this.shippingConfig;
    return !!(cfg?.freeShippingEnabled && cfg?.freeShippingMinAmount != null
              && this.cart.total() >= cfg.freeShippingMinAmount);
  }

  isDeliveryStepValid(): boolean {
    const type = this.typeForm.get('shippingType')?.value;
    if (type === 'NATIONAL') {
      if (!this.isAddressReady()) return false;
      if (this.hasFreeShipping) return true;
      if (!this.shippingRates) return false;
      if (this.shippingRates.skydropxAvailable) return !!this.selectedSkydropxRate;
      return true;
    }
    if (type === 'PICKUP') {
      if (!this.deliveryForm.get('pickupLocationId')?.value) return false;
      if (!this.deliveryForm.get('pickupDate')?.value) return false;
      if (this.availableSlots.length > 1 && !this.selectedSlotId) return false;
      return true;
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
                  this.onOrderSuccess(orderNumber);
                },
                error: () => {
                  this.processingPayment = false;
                  this.onOrderSuccess(orderNumber);
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
      this.onOrderSuccess(this.savedOrderNumber!);
      this.snackBar.open(error.message || 'Pago fallido. Tu pedido se actualizará automáticamente.', 'Cerrar', { duration: 5000 });
    } else if (paymentIntent) {
      if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing' || paymentIntent.status === 'requires_capture') {
        const msg = paymentIntent.status === 'succeeded'
          ? '¡Pedido realizado con éxito!'
          : 'El pago está siendo procesado. Tu pedido se confirmará en breve.';
        this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
        this.onOrderSuccess(this.savedOrderNumber!);
      } else {
        this.loading = false;
        this.snackBar.open('El pago no se completó. Intenta de nuevo.', 'Cerrar', { duration: 5000 });
      }
    } else {
      this.loading = false;
      this.snackBar.open('El pago no se completó. Intenta de nuevo.', 'Cerrar', { duration: 5000 });
    }
  }

  private onOrderSuccess(orderNumber: string): void {
    if (this.authService.isLoggedIn()) {
      this.cart.resetLocalCart();
      this.router.navigate(['/orders', orderNumber]);
    } else {
      const email = this.guestForm.get('guestEmail')?.value;
      const total = this.totalWithShipping;
      this.cart.clearLocalCart();
      this.router.navigate(['/confirmacion'], { state: { orderNumber, email, total } });
    }
  }

  private submitOrder(paymentId?: string, onOrderCreated?: () => void): void {
    const type = this.typeForm.get('shippingType')?.value;
    const v = this.deliveryForm.value;

    if (!this.authService.isLoggedIn()) {
      this.submitGuestOrder(paymentId, onOrderCreated);
      return;
    }

    const couponCode = this.cart.coupon()?.code;
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
      const pickupDateObj: Date | null = v.pickupDate;
      request = {
        ...request,
        pickupLocationId: v.pickupLocationId,
        ...(pickupDateObj && { pickupDate: this.toIsoDate(pickupDateObj) }),
        ...(this.selectedSlotId && { pickupAvailabilityId: this.selectedSlotId }),
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

  private submitGuestOrder(paymentId?: string, onOrderCreated?: () => void): void {
    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched();
      this.loading = false;
      this.snackBar.open('Por favor completa tus datos de contacto', 'Cerrar', { duration: 3000 });
      return;
    }

    const type = this.typeForm.get('shippingType')?.value;
    const v = this.deliveryForm.value;
    const g = this.guestForm.value;

    const items: GuestOrderItemRequest[] = this.cart.localItems().map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      sizeId: item.selectedSizeId,
      colorName: item.selectedColorName,
    }));

    let request: GuestOrderRequest = {
      guestFirstName: g.guestFirstName,
      guestLastName: g.guestLastName,
      guestEmail: g.guestEmail,
      guestPhone: g.guestPhone || undefined,
      items,
      paymentMethod: this.paymentForm.get('paymentMethod')?.value,
      notes: this.paymentForm.get('notes')?.value || undefined,
      shippingType: type,
      ...(paymentId && { paymentId }),
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
      const pickupDateObj: Date | null = v.pickupDate;
      request = {
        ...request,
        pickupLocationId: v.pickupLocationId,
        ...(pickupDateObj && { pickupDate: this.toIsoDate(pickupDateObj) }),
        ...(this.selectedSlotId && { pickupAvailabilityId: this.selectedSlotId }),
      };
    }

    this.orderService.createGuestOrder(request).subscribe({
      next: (res) => {
        if (onOrderCreated) {
          this.savedOrderNumber = res.data.orderNumber;
          onOrderCreated();
        } else {
          this.snackBar.open('¡Pedido realizado con éxito!', 'Cerrar', { duration: 5000 });
          this.onOrderSuccess(res.data.orderNumber);
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Error al realizar el pedido', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
