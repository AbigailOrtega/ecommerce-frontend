import { Component, effect, inject, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlatformService, PlatformStore, cleanDomain, slugify } from './platform.service';

/**
 * The super admin's page (not a store's admin): create stores, invite their admins, add domains,
 * suspend or reactivate them. Only on the platform's domain, with a super admin's own account
 * (not a user of any store).
 */
@Component({
  selector: 'app-platform',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule],
  template: `
  <div class="container platform">
    <h1>Plataforma: tiendas</h1>

    @if (resetToken()) {
      <mat-card class="card">
        <h2>Pon tu contraseña</h2>
        <form [formGroup]="resetForm" (ngSubmit)="saveNewPassword()">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Contraseña nueva (mínimo 8)</mat-label>
            <input matInput type="password" formControlName="password" autocomplete="new-password" data-testid="platform-new-password">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Repítela</mat-label>
            <input matInput type="password" formControlName="repeat" autocomplete="new-password" data-testid="platform-repeat-password">
          </mat-form-field>
          @if (resetForm.controls.repeat.value && !passwordsMatch()) {
            <p class="error" data-testid="platform-mismatch">Las contraseñas no coinciden</p>
          }
          <button mat-raised-button color="primary" type="submit"
                  [disabled]="resetForm.invalid || !passwordsMatch() || busy()">Guardar contraseña</button>
          @if (resetError()) { <p class="error">{{ resetError() }}</p> }
        </form>
      </mat-card>
    } @else if (!platform.session()) {
      <mat-card class="card">
        @if (forgotMode()) {
          <p>Escribe tu correo y te enviamos un enlace para poner tu contraseña.</p>
          <form [formGroup]="forgotForm" (ngSubmit)="sendLink()">
            <mat-form-field appearance="outline" class="full">
              <mat-label>Correo</mat-label>
              <input matInput type="email" formControlName="email" autocomplete="username" data-testid="platform-forgot-email">
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="forgotForm.invalid || busy()">Enviar enlace</button>
            <button mat-button type="button" (click)="forgotMode.set(false)">Volver</button>
          </form>
        } @else {
          <p>Entra con tu cuenta de super admin.</p>
          <form [formGroup]="loginForm" (ngSubmit)="login()">
            <mat-form-field appearance="outline" class="full">
              <mat-label>Correo</mat-label>
              <input matInput type="email" formControlName="email" autocomplete="username" data-testid="platform-email">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" formControlName="password" autocomplete="current-password" data-testid="platform-password">
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || busy()">Entrar</button>
            <button mat-button type="button" (click)="forgotMode.set(true)" data-testid="platform-forgot">¿Olvidaste tu contraseña?</button>
            @if (loginError()) { <p class="error" data-testid="platform-login-error">{{ loginError() }}</p> }
          </form>
        }
      </mat-card>
    } @else if (!loaded()) {
      @if (loadError()) { <p class="error">{{ loadError() }}</p> } @else { <p class="hint">Cargando tiendas…</p> }
    } @else {
      <div class="toolbar">
        <button mat-raised-button color="primary" (click)="showCreate.set(!showCreate())" data-testid="new-store">
          <mat-icon>add</mat-icon> {{ showCreate() ? 'Cancelar' : 'Nueva tienda' }}
        </button>
        <button mat-button (click)="logout()"><mat-icon>logout</mat-icon> Salir</button>
      </div>

      @if (showCreate()) {
        <mat-card class="card">
          <h2>Nueva tienda</h2>
          <p class="hint">
            <mat-icon inline>info</mat-icon>
            Antes, agrega el dominio al proyecto en <b>Vercel → Settings → Domains</b>
            (un <code>algo.vercel.app</code> es gratis). Al crearla, el admin recibe un correo para poner su contraseña.
          </p>
          <form [formGroup]="createForm" (ngSubmit)="create()" class="grid">
            <mat-form-field appearance="outline">
              <mat-label>Nombre de la tienda</mat-label>
              <input matInput formControlName="name" (input)="suggestSlug()" data-testid="store-name">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Nombre corto</mat-label>
              <input matInput formControlName="slug" data-testid="store-slug">
              <mat-hint>minúsculas, números y guiones</mat-hint>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Dominio</mat-label>
              <input matInput formControlName="domain" placeholder="papeleria.vercel.app" data-testid="store-domain">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Correo del admin</mat-label>
              <input matInput type="email" formControlName="adminEmail" data-testid="store-admin-email">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Nombre del admin (opcional)</mat-label>
              <input matInput formControlName="adminFirstName">
            </mat-form-field>
            <div class="actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="createForm.invalid || busy()" data-testid="create-store">
                Crear tienda y enviar invitación
              </button>
            </div>
          </form>
        </mat-card>
      }

      @for (store of stores(); track store.id) {
        <mat-card class="card store" [attr.data-testid]="'store-' + store.slug">
          <div class="store-head">
            <div>
              <h2>{{ store.name }} <small>#{{ store.id }} · {{ store.slug }}</small></h2>
              <span class="status" [class.off]="store.status === 'SUSPENDED'">
                {{ store.status === 'ACTIVE' ? 'Activa' : 'Suspendida' }}
              </span>
            </div>
            <button mat-stroked-button (click)="toggle(store)" [disabled]="busy()"
                    [attr.data-testid]="'toggle-' + store.slug">
              {{ store.status === 'ACTIVE' ? 'Suspender' : 'Reactivar' }}
            </button>
          </div>

          <p class="domains">
            @for (d of store.domains; track d) {
              <a [href]="'https://' + d" target="_blank" rel="noopener">{{ d }}</a>
              <a [href]="'https://' + d + '/admin'" target="_blank" rel="noopener" class="admin-link">admin</a>
            } @empty { <span class="hint">Sin dominio</span> }
          </p>

          <div class="inline">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Invitar admin (correo)</mat-label>
              <input matInput type="email" #inviteEmail [attr.data-testid]="'invite-' + store.slug">
            </mat-form-field>
            <button mat-button (click)="invite(store, inviteEmail.value); inviteEmail.value = ''" [disabled]="busy() || !inviteEmail.value">
              <mat-icon>mail</mat-icon> Enviar invitación
            </button>
          </div>
          <div class="inline">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Agregar dominio</mat-label>
              <input matInput #newDomain placeholder="www.tienda.com">
            </mat-form-field>
            <button mat-button (click)="addDomain(store, newDomain.value); newDomain.value = ''" [disabled]="busy() || !newDomain.value">
              <mat-icon>add_link</mat-icon> Agregar
            </button>
          </div>
        </mat-card>
      }
    }
  </div>
  `,
  styles: [`
    .platform { max-width: 900px; margin: 24px auto; padding: 0 16px; }
    .card { margin: 16px 0; padding: 16px; }
    .full { width: 100%; }
    .toolbar { display: flex; gap: 8px; flex-wrap: wrap; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0 16px; }
    .actions { grid-column: 1 / -1; }
    .hint { opacity: .75; font-size: .9rem; }
    .error { color: #c62828; }
    .store-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
    .store-head h2 { margin: 0 0 4px; }
    .store-head small { font-weight: 400; opacity: .6; font-size: .8rem; }
    .status { font-size: .8rem; padding: 2px 8px; border-radius: 12px; background: #e8f5e9; color: #2e7d32; }
    .status.off { background: #ffebee; color: #c62828; }
    .domains { display: flex; flex-wrap: wrap; gap: 4px 12px; word-break: break-all; }
    .admin-link { font-size: .8rem; opacity: .7; }
    .inline { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 8px; }
    .inline mat-form-field { flex: 1 1 220px; }
  `],
})
export class PlatformComponent {
  readonly platform = inject(PlatformService);
  private readonly snack = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly stores = signal<PlatformStore[]>([]);
  readonly loaded = signal(false);
  readonly busy = signal(false);
  readonly loginError = signal('');
  readonly loadError = signal('');
  readonly resetError = signal('');
  readonly showCreate = signal(false);
  readonly forgotMode = signal(false);
  /** From the e-mailed link (/plataforma?token=…): set the password. */
  readonly resetToken = signal<string | null>(this.route.snapshot.queryParamMap.get('token'));

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  readonly forgotForm = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });
  readonly resetForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeat: ['', Validators.required],
  });
  readonly createForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/)]],
    domain: ['', Validators.required],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminFirstName: [''],
  });

  constructor() {
    effect(() => {
      if (this.platform.session() && !this.resetToken()) untracked(() => { if (!this.loaded() && !this.busy()) this.load(); });
    });
  }

  passwordsMatch(): boolean {
    const v = this.resetForm.getRawValue();
    return v.password === v.repeat;
  }

  login(): void {
    this.busy.set(true);
    this.loginError.set('');
    const { email, password } = this.loginForm.getRawValue();
    this.platform.login(email.trim(), password).subscribe({
      next: () => { this.busy.set(false); this.loginForm.reset(); },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        this.loginError.set(e.status === 401 ? 'Correo o contraseña incorrectos'
          : e.status === 429 ? 'Demasiados intentos; espera unos minutos'
          : e.error?.message || 'No se pudo conectar con el servidor');
      },
    });
  }

  sendLink(): void {
    this.busy.set(true);
    this.platform.forgotPassword(this.forgotForm.getRawValue().email.trim()).subscribe({
      next: res => {
        this.busy.set(false);
        this.forgotMode.set(false);
        this.snack.open(res.message || 'Si la cuenta existe, te enviamos un enlace.', 'Cerrar', { duration: 8000 });
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        this.snack.open(e.status === 429 ? 'Demasiados intentos; espera una hora' : 'No se pudo enviar', 'Cerrar', { duration: 6000 });
      },
    });
  }

  saveNewPassword(): void {
    const token = this.resetToken();
    if (!token || !this.passwordsMatch()) return;
    this.busy.set(true);
    this.resetError.set('');
    this.platform.resetPassword(token, this.resetForm.getRawValue().password).subscribe({
      next: () => {
        this.busy.set(false);
        this.platform.logout();
        this.resetToken.set(null);
        this.router.navigate([], { queryParams: {} });
        this.snack.open('Contraseña guardada. Ya puedes entrar.', 'Cerrar', { duration: 6000 });
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        this.resetError.set(e.error?.message || 'No se pudo guardar');
      },
    });
  }

  logout(): void {
    this.platform.logout();
    this.stores.set([]);
    this.loaded.set(false);
    this.loadError.set('');
  }

  private load(): void {
    this.busy.set(true);
    this.platform.list().subscribe({
      next: res => {
        this.stores.set(res.data);
        this.loaded.set(true);
        this.loadError.set('');
        this.busy.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        if (e.status === 401) { this.logout(); this.loginError.set('Tu sesión terminó; vuelve a entrar'); return; }
        this.loadError.set(e.status === 404 ? 'La plataforma no responde en este dominio (revisa PLATFORM_HOST)'
          : 'No se pudo conectar con el servidor');
      },
    });
  }

  suggestSlug(): void {
    // follows the name until the owner types a short name of their own
    const slug = this.createForm.controls.slug;
    if (!slug.dirty) slug.setValue(slugify(this.createForm.controls.name.value));
  }

  create(): void {
    const v = this.createForm.getRawValue();
    const domain = cleanDomain(v.domain);
    this.run(this.platform.create({
      slug: v.slug, name: v.name.trim(), domains: [domain], baseUrl: `https://${domain}`,
      adminEmail: v.adminEmail.trim(), adminFirstName: v.adminFirstName.trim() || undefined,
    }), `Tienda creada. Se envió la invitación a ${v.adminEmail.trim()}`, () => {
      this.createForm.reset();
      this.showCreate.set(false);
    });
  }

  toggle(store: PlatformStore): void {
    const next = store.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    if (next === 'SUSPENDED' && !confirm(`¿Suspender "${store.name}"? Su tienda dejará de mostrarse.`)) return;
    this.run(this.platform.setStatus(store.id, next), next === 'ACTIVE' ? 'Tienda reactivada' : 'Tienda suspendida');
  }

  invite(store: PlatformStore, email: string): void {
    this.run(this.platform.invite(store.id, email.trim()), `Invitación enviada a ${email.trim()}`);
  }

  addDomain(store: PlatformStore, domain: string): void {
    this.run(this.platform.addDomain(store.id, cleanDomain(domain)),
      'Dominio agregado (agrégalo también en Vercel → Settings → Domains)');
  }

  private run(call: Observable<unknown>, ok: string, after?: () => void): void {
    this.busy.set(true);
    call.subscribe({
      next: () => {
        this.snack.open(ok, 'Cerrar', { duration: 5000 });
        after?.();
        this.load();
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        if (e.status === 401) { this.logout(); this.loginError.set('Tu sesión terminó; vuelve a entrar'); return; }
        this.snack.open(e.error?.message || 'No se pudo completar', 'Cerrar', { duration: 6000 });
      },
    });
  }
}
