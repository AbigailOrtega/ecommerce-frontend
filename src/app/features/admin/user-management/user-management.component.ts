import { Component, OnInit } from '@angular/core';
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
        <h1>User Management</h1>
        <a mat-button routerLink="/admin">&larr; Dashboard</a>
      </div>

      @if (loading) {
        <app-loading />
      } @else {
        <table mat-table [dataSource]="users" class="user-table">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let u">{{ u.id }}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let u">{{ u.firstName }} {{ u.lastName }}</td>
          </ng-container>
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let u">{{ u.email }}</td>
          </ng-container>
          <ng-container matColumnDef="phone">
            <th mat-header-cell *matHeaderCellDef>Phone</th>
            <td mat-cell *matCellDef="let u">{{ u.phone || '-' }}</td>
          </ng-container>
          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef>Role</th>
            <td mat-cell *matCellDef="let u">
              <mat-chip [class]="u.role === 'ADMIN' ? 'admin-chip' : ''">{{ u.role }}</mat-chip>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .user-table { width: 100%; margin-top: 16px; }
    .admin-chip { background: #e8eaf6 !important; color: #283593 !important; }
  `],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = true;
  columns = ['id', 'name', 'email', 'phone', 'role'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe({
      next: (res) => { this.users = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
