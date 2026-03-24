import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AdminService } from '@core/services/admin.service';
import { User } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule, LoadingComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Usuarios</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

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
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 16px; }
    .user-table { width: 100%; }
    .admin-chip { background: rgba(0,0,0,0.06) !important; color: #283593 !important; }
    @media (max-width: 600px) {
      .table-wrap td, .table-wrap th { font-size: 0.8rem; padding: 6px 8px !important; white-space: nowrap; }
    }
  `],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = true;
  columns = ['id', 'name', 'email', 'phone', 'role'];
  isMobile = window.innerWidth < 600;
  get visibleColumns() { return this.isMobile ? ['name', 'email', 'role'] : this.columns; }
  @HostListener('window:resize') onResize() { this.isMobile = window.innerWidth < 600; }

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe({
      next: (res) => { this.users = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
