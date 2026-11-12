import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlatformService, PlatformStore, cleanDomain, slugify } from './platform.service';

/**
 * The platform owner's page (not a store's admin): create stores, invite their admins, add domains,
 * suspend or reactivate them. Entered with the platform key (PLATFORM_API_KEY on Render).
 */
@Component({
  selector: 'app-platform',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule],
  template: `
  <div class="container platform">
    <h1>Plataforma: tiendas</h1>

    @if (!unlocked()) {
      <mat-card class="card">
        <p>Entra con la clave de plataforma (la variable <code>PLATFORM_API_KEY</code> de Render).</p>
        <form [formGroup]="keyForm" (ngSubmit)="unlock()">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Clave de plataforma</mat-label>
            <input matInput type="password" formControlName="key" autocomplete="off" data-testid="platform-key">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="keyForm.invalid || busy()">Entrar</button>
          @if (keyError()) { <p class="error" data-testid="platform-key-error">{{ keyError() }}</p> }
        </form>
      </mat-card>
    } @else {
      <div class="toolbar">
        <button mat-raised-button color="primary" (click)="showCreate.set(!showCreate())" data-testid="new-store">
          <mat-icon>add</mat-icon> {{ showCreate() ? 'Cancelar' : 'Nueva tienda' }}
        </button>
        <button mat-button (click)="lock()"><mat-icon>logout</mat-icon> Salir</button>
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
            @if (store.id !== 1) {
              <button mat-stroked-button (click)="toggle(store)" [disabled]="busy()">
                {{ store.status === 'ACTIVE' ? 'Suspender' : 'Reactivar' }}
              </button>
            }
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
export class PlatformComponent implements OnInit {
  private readonly platform = inject(PlatformService);
  private readonly snack = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  readonly unlocked = signal(false);
  readonly stores = signal<PlatformStore[]>([]);
  readonly busy = signal(false);
  readonly keyError = signal('');
  readonly showCreate = signal(false);

  readonly keyForm = this.fb.nonNullable.group({ key: ['', Validators.required] });
  readonly createForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/)]],
    domain: ['', Validators.required],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminFirstName: [''],
  });

  ngOnInit(): void {
    if (this.platform.key) this.load();
  }

  unlock(): void {
    this.platform.key = this.keyForm.getRawValue().key.trim();
    this.load();
  }

  lock(): void {
    this.platform.key = '';
    this.unlocked.set(false);
    this.stores.set([]);
    this.keyForm.reset();
  }

  private load(): void {
    this.busy.set(true);
    this.platform.list().subscribe({
      next: res => {
        this.stores.set(res.data);
        this.unlocked.set(true);
        this.keyError.set('');
        this.busy.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this.platform.key = '';
        this.unlocked.set(false);
        this.busy.set(false);
        this.keyError.set(e.status === 401 ? 'Clave incorrecta'
          : e.status === 404 ? 'La plataforma no está activada: falta PLATFORM_API_KEY en Render'
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
        this.snack.open(e.error?.message || 'No se pudo completar', 'Cerrar', { duration: 6000 });
      },
    });
  }
}
