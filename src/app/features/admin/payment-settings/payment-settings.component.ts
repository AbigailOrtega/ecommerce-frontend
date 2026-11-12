import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiResponse } from '@shared/models';
import { PaymentSettings, PaymentSettingsService } from './payment-settings.service';

/**
 * The store's own accounts: card payments (Stripe), PayPal and shipping labels (Skydropx). Each key is
 * checked with the provider before it is saved; saved secrets are encrypted and only their end shown.
 * Every change asks for the admin's password again and is e-mailed to all the store's admins.
 */
@Component({
  selector: 'app-admin-payment-settings',
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSlideToggleModule, MatSnackBarModule],
  template: `
  <div class="page">
    <h1>Pagos y envíos</h1>
    <p class="hint">Las cuentas de tu tienda: los cobros llegan a tu Stripe y tu PayPal, y las guías se pagan con tu Skydropx.
      Las claves secretas se guardan cifradas y después solo se muestran sus últimos 4 caracteres.</p>

    @if (settings(); as s) {
      @if (!s.canSave) {
        <p class="error" data-testid="no-encryption">El servidor no tiene ENCRYPTION_KEY: no se pueden guardar claves.</p>
      }

      <mat-card class="card confirm">
        <p class="hint"><mat-icon inline>lock</mat-icon> Para guardar o desactivar algo, confirma tu contraseña.
          Cada cambio se avisa por correo a todos los admins de la tienda.</p>
        <mat-form-field appearance="outline" class="full" subscriptSizing="dynamic">
          <mat-label>Tu contraseña</mat-label>
          <input matInput type="password" [(ngModel)]="password" autocomplete="current-password" data-testid="confirm-password">
        </mat-form-field>
      </mat-card>

      <!-- Stripe -->
      <mat-card class="card" data-testid="stripe-card">
        <div class="head">
          <h2><mat-icon>credit_card</mat-icon> Tarjeta (Stripe)</h2>
          <span class="badge" [class.on]="s.stripe.active">{{ s.stripe.active ? (s.stripe.testMode ? 'Activo · modo prueba' : 'Activo') : 'Sin configurar' }}</span>
        </div>
        <p class="hint">En Stripe → Desarrolladores → Claves de API. El webhook se crea solo.</p>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Clave publicable (pk_…)</mat-label>
          <input matInput [(ngModel)]="stripe.publicKey" autocomplete="off" data-testid="stripe-public">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Clave secreta (sk_…)</mat-label>
          <input matInput type="password" [(ngModel)]="stripe.secretKey" autocomplete="new-password"
                 [placeholder]="s.stripe.secretKeyEnd ? 'Guardada ' + s.stripe.secretKeyEnd + ' — escribe solo para cambiarla' : ''" data-testid="stripe-secret">
          @if (s.stripe.secretKeyEnd) { <mat-hint>Guardada: {{ s.stripe.secretKeyEnd }}</mat-hint> }
        </mat-form-field>
        <details>
          <summary>Webhook {{ s.stripe.webhook ? '(configurado)' : '(no configurado)' }}</summary>
          <p class="hint">Solo si prefieres crearlo tú: en Stripe apúntalo a <code>{{ s.webhookBaseUrl }}/api/webhooks/stripe</code> y pega aquí su secreto.</p>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Secreto del webhook (whsec_…)</mat-label>
            <input matInput type="password" [(ngModel)]="stripe.webhookSecret" autocomplete="new-password">
          </mat-form-field>
        </details>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="saveStripe()" [disabled]="busy() || !s.canSave || !stripe.publicKey || !password" data-testid="stripe-save">Guardar y probar</button>
          @if (s.stripe.active) { <button mat-button color="warn" (click)="remove('stripe', 'pagos con tarjeta')" [disabled]="busy() || !password">Desactivar</button> }
        </div>
      </mat-card>

      <!-- PayPal -->
      <mat-card class="card" data-testid="paypal-card">
        <div class="head">
          <h2><mat-icon>account_balance_wallet</mat-icon> PayPal</h2>
          <span class="badge" [class.on]="s.paypal.active">{{ s.paypal.active ? (s.paypal.live ? 'Activo' : 'Activo · sandbox') : 'Sin configurar' }}</span>
        </div>
        <p class="hint">En developer.paypal.com → Apps & Credentials → tu app. El webhook se crea solo.</p>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Client ID</mat-label>
          <input matInput [(ngModel)]="paypal.clientId" autocomplete="off" data-testid="paypal-id">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Secret</mat-label>
          <input matInput type="password" [(ngModel)]="paypal.clientSecret" autocomplete="new-password" data-testid="paypal-secret">
          @if (s.paypal.clientSecretEnd) { <mat-hint>Guardado: {{ s.paypal.clientSecretEnd }} — escribe solo para cambiarlo</mat-hint> }
        </mat-form-field>
        <mat-slide-toggle [(ngModel)]="paypal.live">Cobros reales (apagado: sandbox de pruebas)</mat-slide-toggle>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="savePayPal()" [disabled]="busy() || !s.canSave || !paypal.clientId || !password" data-testid="paypal-save">Guardar y probar</button>
          @if (s.paypal.active) { <button mat-button color="warn" (click)="remove('paypal', 'PayPal')" [disabled]="busy() || !password">Desactivar</button> }
        </div>
      </mat-card>

      <!-- Skydropx -->
      <mat-card class="card" data-testid="skydropx-card">
        <div class="head">
          <h2><mat-icon>local_shipping</mat-icon> Guías (Skydropx)</h2>
          <span class="badge" [class.on]="s.skydropx.active">{{ s.skydropx.active ? (s.skydropx.sandbox ? 'Activo · sandbox' : 'Activo') : 'Sin configurar' }}</span>
        </div>
        <p class="hint">En Skydropx → Configuración → API.</p>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Client ID</mat-label>
          <input matInput [(ngModel)]="skydropx.clientId" autocomplete="off" data-testid="skydropx-id">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Client Secret</mat-label>
          <input matInput type="password" [(ngModel)]="skydropx.clientSecret" autocomplete="new-password" data-testid="skydropx-secret">
          @if (s.skydropx.clientSecretEnd) { <mat-hint>Guardado: {{ s.skydropx.clientSecretEnd }} — escribe solo para cambiarlo</mat-hint> }
        </mat-form-field>
        <mat-slide-toggle [(ngModel)]="skydropx.sandbox">Sandbox de pruebas</mat-slide-toggle>
        <details>
          <summary>Webhook de rastreo {{ s.skydropx.webhook ? '(configurado)' : '(no configurado)' }}</summary>
          <p class="hint">En Skydropx crea un webhook a <code>{{ s.webhookBaseUrl }}/api/webhooks/skydropx</code> y pega aquí su secreto.</p>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Secreto del webhook</mat-label>
            <input matInput type="password" [(ngModel)]="skydropx.webhookSecret" autocomplete="new-password">
          </mat-form-field>
        </details>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="saveSkydropx()" [disabled]="busy() || !s.canSave || !skydropx.clientId || !password" data-testid="skydropx-save">Guardar y probar</button>
          @if (s.skydropx.active) { <button mat-button color="warn" (click)="remove('skydropx', 'las guías de Skydropx')" [disabled]="busy() || !password">Desactivar</button> }
        </div>
      </mat-card>
    } @else if (loadError()) {
      <p class="error">{{ loadError() }}</p>
    } @else {
      <p class="hint">Cargando…</p>
    }
  </div>
  `,
  styles: [`
    .page { max-width: 760px; }
    .card { margin: 16px 0; padding: 16px; }
    .confirm { background: #fffde7; }
    .head { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
    .head h2 { display: flex; align-items: center; gap: 8px; margin: 0; }
    .badge { font-size: .8rem; padding: 2px 10px; border-radius: 12px; background: #eceff1; color: #455a64; }
    .badge.on { background: #e8f5e9; color: #2e7d32; }
    .hint { opacity: .75; font-size: .9rem; }
    .full { width: 100%; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
    .error { color: #c62828; }
    details { margin: 8px 0; }
    summary { cursor: pointer; opacity: .8; }
    code { word-break: break-all; }
  `],
})
export class PaymentSettingsComponent implements OnInit {
  private readonly service = inject(PaymentSettingsService);
  private readonly snack = inject(MatSnackBar);

  readonly settings = signal<PaymentSettings | null>(null);
  readonly busy = signal(false);
  readonly loadError = signal('');

  /** The admin's password, asked again for every change; forgotten after each one. */
  password = '';
  stripe = { publicKey: '', secretKey: '', webhookSecret: '' };
  paypal = { clientId: '', clientSecret: '', live: false };
  skydropx = { clientId: '', clientSecret: '', sandbox: true, webhookSecret: '' };

  ngOnInit(): void {
    this.service.get().subscribe({
      next: res => this.apply(res.data),
      error: () => this.loadError.set('No se pudo cargar la configuración'),
    });
  }

  saveStripe(): void {
    this.run(this.service.saveStripe({ publicKey: this.stripe.publicKey.trim(),
      secretKey: this.stripe.secretKey.trim() || undefined, webhookSecret: this.stripe.webhookSecret.trim() || undefined,
      currentPassword: this.password }), 'Stripe');
  }

  savePayPal(): void {
    this.run(this.service.savePayPal({ clientId: this.paypal.clientId.trim(),
      clientSecret: this.paypal.clientSecret.trim() || undefined, live: this.paypal.live, currentPassword: this.password }), 'PayPal');
  }

  saveSkydropx(): void {
    this.run(this.service.saveSkydropx({ clientId: this.skydropx.clientId.trim(),
      clientSecret: this.skydropx.clientSecret.trim() || undefined, sandbox: this.skydropx.sandbox,
      webhookSecret: this.skydropx.webhookSecret.trim() || undefined, currentPassword: this.password }), 'Skydropx');
  }

  remove(provider: 'stripe' | 'paypal' | 'skydropx', what: string): void {
    if (!confirm(`¿Desactivar ${what}? Sus claves se borran de la tienda.`)) return;
    this.run(this.service.remove(provider, this.password), 'Desactivado');
  }

  private run(call: Observable<ApiResponse<PaymentSettings>>, what: string): void {
    this.busy.set(true);
    call.subscribe({
      next: res => {
        this.busy.set(false);
        this.password = '';
        this.apply(res.data);
        const notes = res.data.notes?.length ? ' · ' + res.data.notes.join(' · ') : '';
        this.snack.open(`${what}: guardado${notes}`, 'Cerrar', { duration: 9000 });
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        this.snack.open(e.error?.message || 'No se pudo guardar', 'Cerrar', { duration: 9000 });
      },
    });
  }

  /** Shows what is saved; secret fields stay empty (blank = keep the saved one). */
  private apply(s: PaymentSettings): void {
    this.settings.set(s);
    this.stripe = { publicKey: s.stripe.publicKey ?? '', secretKey: '', webhookSecret: '' };
    this.paypal = { clientId: s.paypal.clientId ?? '', clientSecret: '', live: s.paypal.live };
    this.skydropx = { clientId: s.skydropx.clientId ?? '', clientSecret: '', sandbox: s.skydropx.sandbox, webhookSecret: '' };
  }
}
