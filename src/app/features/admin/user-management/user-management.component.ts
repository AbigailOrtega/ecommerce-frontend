import { Component, DestroyRef, HostListener, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';
import { AdminService } from '@core/services/admin.service';
import { User } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
    selector: 'app-user-management',
    imports: [RouterLink, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule,
        MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSnackBarModule, LoadingComponent],
    template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Usuarios</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <section class="invite" aria-labelledby="invite-title">
        <h2 id="invite-title">Dar acceso de admin</h2>
        <p class="hint">Si el correo ya tiene cuenta, se vuelve admin. Si no, se crea la cuenta y le llega un
          enlace para crear su contraseña (vence en 48 horas).</p>
        <form [formGroup]="inviteForm" (ngSubmit)="invite()" class="invite-form">
          <mat-form-field appearance="outline">
            <mat-label>Correo</mat-label>
            <input matInput type="email" formControlName="email" data-testid="invite-email" />
            @if (inviteForm.controls.email.hasError('email')) { <mat-error>Correo inválido</mat-error> }
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Nombre (opcional)</mat-label>
            <input matInput formControlName="firstName" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Apellido (opcional)</mat-label>
            <input matInput formControlName="lastName" />
          </mat-form-field>
          <button mat-flat-button color="primary" type="submit" [disabled]="inviteForm.invalid || saving"
                  data-testid="invite-submit">Dar acceso</button>
        </form>
      </section>

      <mat-form-field appearance="outline" class="search">
        <mat-label>Buscar por nombre o correo</mat-label>
        <input matInput [formControl]="search" />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      @if (loading) {
        <app-loading />
      } @else {
        <div class="table-wrap">
          <table mat-table [dataSource]="users" class="user-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let u">{{ u.id }}</td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let u">{{ u.firstName }} {{ u.lastName }}</td>
            </ng-container>
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let u">{{ u.email }}</td>
            </ng-container>
            <ng-container matColumnDef="phone">
              <th mat-header-cell *matHeaderCellDef>Teléfono</th>
              <td mat-cell *matCellDef="let u">{{ u.phone || '-' }}</td>
            </ng-container>
            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Rol</th>
              <td mat-cell *matCellDef="let u">
                <mat-chip [class]="u.role !== 'CUSTOMER' ? 'admin-chip' : ''">{{ u.role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : u.role }}</mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let u">
                @if (u.role === 'SUPER_ADMIN') {
                  <!-- set by hand in the database, not from here -->
                } @else if (u.role === 'ADMIN') {
                  @if (!isMe(u)) {
                    <button mat-stroked-button color="warn" [disabled]="saving" (click)="revoke(u)">Quitar admin</button>
                  }
                } @else {
                  <button mat-stroked-button [disabled]="saving" (click)="promote(u)">Hacer admin</button>
                }
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="visibleColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: visibleColumns;"></tr>
          </table>
        </div>
        <mat-paginator [length]="totalElements" [pageIndex]="pageIndex" [pageSize]="pageSize"
                       [pageSizeOptions]="[20, 50, 100]" (page)="onPage($event)" />
      }
    </div>
  `,
    styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 16px; }
    .user-table { width: 100%; }
    .search { width: 100%; max-width: 420px; margin-top: 16px; }
    .invite { margin-top: 16px; padding: 16px; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; }
    .invite h2 { margin: 0 0 4px; font-size: 1.1rem; }
    .hint { margin: 0 0 12px; color: rgba(0,0,0,0.6); font-size: 0.9rem; }
    .invite-form { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: flex-start; }
    .invite-form mat-form-field { flex: 1 1 200px; }
    .invite-form button { margin-top: 8px; }
    .admin-chip { background: rgba(0,0,0,0.06) !important; color: #283593 !important; }
    @media (max-width: 600px) {
      .table-wrap td, .table-wrap th { font-size: 0.8rem; padding: 6px 8px !important; white-space: nowrap; }
    }
  `]
})
export class UserManagementComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  users: User[] = [];
  loading = true;
  totalElements = 0;
  pageIndex = 0;
  pageSize = 20;
  search = new FormControl('', { nonNullable: true });
  columns = ['id', 'name', 'email', 'phone', 'role', 'actions'];
  isMobile = window.innerWidth < 600;
  get visibleColumns() { return this.isMobile ? ['name', 'email', 'role', 'actions'] : this.columns; }
  @HostListener('window:resize') onResize() { this.isMobile = window.innerWidth < 600; }

  saving = false;
  inviteForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
  });

  private auth = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  constructor(private adminService: AdminService) {}

  isMe(u: User): boolean {
    return u.email.toLowerCase() === this.auth.user()?.email?.toLowerCase();
  }

  invite(): void {
    if (this.inviteForm.invalid) return;
    const { email, firstName, lastName } = this.inviteForm.getRawValue();
    this.grant(email, firstName, lastName, () => this.inviteForm.reset());
  }

  promote(u: User): void {
    if (!confirm(`¿Dar acceso de admin a ${u.email}? Podrá administrar toda la tienda.`)) return;
    this.grant(u.email, '', '');
  }

  revoke(u: User): void {
    if (!confirm(`¿Quitar el acceso de admin a ${u.email}?`)) return;
    this.saving = true;
    this.adminService.revokeAdmin(u.id).subscribe({
      next: (res) => this.done(res.message ?? 'Acceso de admin retirado'),
      error: (err) => this.failed(err),
    });
  }

  private grant(email: string, firstName: string, lastName: string, after?: () => void): void {
    this.saving = true;
    this.adminService.inviteAdmin(email, firstName, lastName).subscribe({
      next: (res) => { after?.(); this.done(res.message ?? 'Acceso de admin otorgado'); },
      error: (err) => this.failed(err),
    });
  }

  private done(message: string): void {
    this.saving = false;
    this.snackBar.open(message, 'Cerrar', { duration: 4000 });
    this.load();
  }

  private failed(err: any): void {
    this.saving = false;
    this.snackBar.open(err?.error?.message || 'No se pudo completar la acción', 'Cerrar', { duration: 5000 });
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => { this.pageIndex = 0; this.load(); });
    this.load();
  }

  onPage(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.adminService.getAllUsers(this.pageIndex, this.pageSize, this.search.value).subscribe({
      next: (res) => {
        this.users = res.data.content;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }
}
