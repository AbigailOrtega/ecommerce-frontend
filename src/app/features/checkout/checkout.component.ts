import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { PaymentService, paypalSdk } from '@core/services/payment.service';
import { roundMoney } from '@core/utils/money';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';
import { ShippingService } from '@core/services/shipping.service';
import { AuthService } from '@core/services/auth.service';
import { GuestOrderItemRequest, GuestOrderRequest, OrderRequest, PickupAvailability, PickupLocation, ShippingConfig, ShippingRatesResponse, SkydropxRate } from '@shared/models';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-checkout',
    imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
        MatButtonModule, MatStepperModule, MatRadioModule, MatSnackBarModule, MatProgressSpinnerModule,
        MatIconModule, MatDatepickerModule, CurrencyPipe, DecimalPipe, SlicePipe, CheckoutSummaryComponent],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('stripeElement') stripeElementRef!: ElementRef;
  @ViewChild('paypalButtonContainer') paypalButtonContainerRef!: ElementRef;

  guestForm: FormGroup;
  step1Form: FormGroup;
  /** Shown under step 1 after trying to continue without contact details. */
  contactMissing = false;
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
  maxPickupDate = (() => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d; })();

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
  /** Set when preparing the payment form failed: it is retried only when the shopper asks. */
  stripeInitFailed = false;
  paypalInitFailed = false;
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
    return roundMoney(this.cart.total() + this.shippingCostForSummary);
  }

  private readonly destroyRef = inject(DestroyRef);

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

    // A guest cannot leave step 1 without contact details: the email is where the confirmation
    // goes, and the payment form only loads once they are there. Signed-in users have them.
    if (this.authService.isLoggedIn()) this.guestForm.disable();
    this.step1Form = this.fb.group({ type: this.typeForm, contact: this.guestForm });
    this.guestForm.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(status => {
      if (status === 'VALID') this.contactMissing = false;
    });

    this.deliveryForm = this.fb.group({
      shippingAddress: [''],
      shippingCity: [''],
      shippingState: [''],
      shippingZipCode: [''],
      shippingCountry: ['México'],
      pickupLocationId: [null],
      pickupDate: [null],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['stripe', Validators.required],
      notes: ['', Validators.maxLength(255)],
    });

    this.paymentForm.get('paymentMethod')!.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(method => {
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
    // Mounting changes bindings (loading flags), which must not happen while the view is being
    // checked: claim the mount now, start it right after this check.
    if (this.stripeElementRef?.nativeElement && !this.stripeMounted && !this.stripeMountRequested && !this.stripeInitFailed
        && this.paymentForm.get('paymentMethod')?.value === 'stripe'
        && (this.authService.isLoggedIn() || this.guestForm.valid)) {
      this.stripeMountRequested = true;
      setTimeout(() => this.initStripeElement());
    }
    if (this.paypalButtonContainerRef?.nativeElement && !this.paypalMounted && !this.paypalMountRequested && !this.paypalInitFailed
        && this.paymentForm.get('paymentMethod')?.value === 'paypal'
        && (this.authService.isLoggedIn() || this.guestForm.valid)) {
      this.paypalMountRequested = true;
      setTimeout(() => this.initPayPalButtons());
    }
  }

  ngOnDestroy(): void {
    this.destroyStripeElement();
    this.destroyPayPalButtons();
  }

  /** Delivery instructions: shown in step 2, kept in the payment form that submits them. */
  get notesControl(): FormControl {
    return this.paymentForm.get('notes') as FormControl;
  }

  checkContact(): void {
    if (this.authService.isLoggedIn() || this.guestForm.valid) {
      this.contactMissing = false;
      return;
    }
    this.guestForm.markAllAsTouched();
    this.contactMissing = true;
    document.getElementById('contact-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const to = this.toIsoDate(this.maxPickupDate);

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
        // the Payment Element reports problems on confirm, not on change: editing clears the last error
        paymentElement.on('change', () => { this.stripeError = null; });
      },
      error: (err) => {
        this.stripeLoading = false;
        this.stripeMountRequested = false;
        // no automatic retry: every view check would send the same failing request again
        this.stripeInitFailed = true;
        this.stripeError = err.error?.message || err.message || 'Failed to load payment form.';
      },
    });
  }

  /** "Reintentar" under a payment form that failed to load. */
  retryStripe(): void {
    this.stripeInitFailed = false;
    this.stripeError = null;
  }

  retryPayPal(): void {
    this.paypalInitFailed = false;
    this.paypalError = null;
  }

  private destroyStripeElement(): void {
    this.stripeInitFailed = false;
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
          this.paypalInitFailed = true;
          return;
        }
        this.paymentService.loadPayPalSdk(clientId).then(() => {
          this.paypalLoading = false;
          this.renderPayPalButtons();
        }).catch(() => {
          this.paypalLoading = false;
          this.paypalError = 'Failed to load PayPal SDK.';
          this.paypalMountRequested = false;
          this.paypalInitFailed = true;
        });
      },
      error: () => {
        this.paypalLoading = false;
        this.paypalError = 'Failed to get PayPal configuration.';
        this.paypalMountRequested = false;
        this.paypalInitFailed = true;
      },
    });
  }

  private renderPayPalButtons(): void {
    const paypal = paypalSdk();
    if (!paypal || !this.paypalButtonContainerRef?.nativeElement) {
      this.paypalError = 'PayPal SDK not available.';
      return;
    }

    paypal.Buttons({
      createOrder: () => {
        return new Promise<string>((resolve, reject) => {
          this.paymentService.createPayPalOrder(this.totalWithShipping).subscribe({
            next: (res) => resolve(res.data.orderId),
            error: (err) => reject(err),
          });
        });
      },
      // The order is created first (stock is checked and reserved) and only then charged, so a
      // buyer is never charged for an order that could not be created.
      onApprove: (data) => {
        this.processingPayment = true;
        this.submitOrder(data.orderID, () => {
          const orderNumber = this.savedOrderNumber!;
          this.paymentService.capturePayPalForOrder(orderNumber).subscribe({
            next: () => {
              this.processingPayment = false;
              this.onOrderSuccess(orderNumber);
            },
            error: (err) => {
              this.processingPayment = false;
              this.loading = false;
              this.snackBar.open(err.error?.message || 'PayPal no pudo completar el pago. Intenta de nuevo.', 'Cerrar', { duration: 6000 });
            },
          });
        });
      },
      onError: (err) => {
        this.paypalError = 'El pago con PayPal falló. Intenta de nuevo.';
        console.error('PayPal error:', err);
      },
    }).render(this.paypalButtonContainerRef.nativeElement);

    this.paypalMounted = true;
    this.paypalReady = true;
  }

  private destroyPayPalButtons(): void {
    this.paypalInitFailed = false;
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
    let request: OrderRequest = {
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
        this.processingPayment = false;
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
        this.processingPayment = false;
        this.snackBar.open(err.error?.message || 'Error al realizar el pedido', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
