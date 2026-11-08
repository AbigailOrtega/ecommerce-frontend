import { Component, DestroyRef, HostListener, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AdminService } from '@core/services/admin.service';
import { User } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
    selector: 'app-user-management',
    imports: [RouterLink, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule,
        MatFormFieldModule, MatInputModule, MatPaginatorModule, LoadingComponent],
    template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Usuarios</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

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
                <mat-chip [class]="u.role === 'ADMIN' ? 'admin-chip' : ''">{{ u.role }}</mat-chip>
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
  columns = ['id', 'name', 'email', 'phone', 'role'];
  isMobile = window.innerWidth < 600;
  get visibleColumns() { return this.isMobile ? ['name', 'email', 'role'] : this.columns; }
  @HostListener('window:resize') onResize() { this.isMobile = window.innerWidth < 600; }

  constructor(private adminService: AdminService) {}

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
