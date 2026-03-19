import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { AdminService } from '@core/services/admin.service';
import { Ticket, TicketUpdateRequest } from '@shared/models';

@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule,
    MatSnackBarModule, MatTooltipModule, DatePipe],
  template: `
    <div class="container">
      <h1>Tickets de Soporte</h1>

      <!-- Detail panel -->
      @if (selected) {
        <mat-card class="detail-card">
          <div class="detail-header">
            <div>
              <h2>Ticket #{{ selected.id }}</h2>
              <p class="meta">Pedido <strong>{{ selected.orderNumber }}</strong> &mdash;
                {{ selected.userName }} &mdash; {{ selected.createdAt | date:'medium' }}</p>
            </div>
            <button mat-icon-button (click)="selected = null" matTooltip="Cerrar">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <h3>{{ selected.subject }}</h3>
          <p class="description">{{ selected.description }}</p>

          <div class="update-row">
            <mat-form-field appearance="outline">
              <mat-label>Estado</mat-label>
              <mat-select [(ngModel)]="editStatus">
                <mat-option value="OPEN">Abierto</mat-option>
                <mat-option value="IN_PROGRESS">En progreso</mat-option>
                <mat-option value="RESOLVED">Resuelto</mat-option>
                <mat-option value="CLOSED">Cerrado</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="notes-field">
              <mat-label>Notas del admin (visibles al cliente)</mat-label>
              <textarea matInput [(ngModel)]="editNotes" rows="2"></textarea>
            </mat-form-field>

            <button mat-raised-button color="primary" (click)="saveUpdate()" [disabled]="saving">
              {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </mat-card>
      }

      <mat-card class="table-card">
        @if (loading) {
          <p class="empty">Cargando...</p>
        } @else if (tickets.length === 0) {
          <div class="empty-state">
            <mat-icon class="empty-icon">support_agent</mat-icon>
            <p>Sin tickets aún.</p>
          </div>
        } @else {
          <table mat-table [dataSource]="tickets" class="full-width">

            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>#</th>
              <td mat-cell *matCellDef="let t">{{ t.id }}</td>
            </ng-container>

            <ng-container matColumnDef="order">
              <th mat-header-cell *matHeaderCellDef>Pedido</th>
              <td mat-cell *matCellDef="let t">{{ t.orderNumber }}</td>
            </ng-container>

            <ng-container matColumnDef="customer">
              <th mat-header-cell *matHeaderCellDef>Cliente</th>
              <td mat-cell *matCellDef="let t">{{ t.userName }}</td>
            </ng-container>

            <ng-container matColumnDef="subject">
              <th mat-header-cell *matHeaderCellDef>Asunto</th>
              <td mat-cell *matCellDef="let t" class="subject-cell">{{ t.subject }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Estado</th>
              <td mat-cell *matCellDef="let t">
                <mat-chip [class]="'status-' + t.status.toLowerCase()">{{ t.status }}</mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Fecha</th>
              <td mat-cell *matCellDef="let t">{{ t.createdAt | date:'mediumDate' }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let t">
                <button mat-icon-button color="primary" (click)="openDetail(t)" matTooltip="Gestionar ticket">
                  <mat-icon>open_in_new</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                [class.selected-row]="selected?.id === row.id"></tr>
          </table>
        }
      </mat-card>
    </div>
  `,
  styles: [`
    .detail-card { padding: 24px; margin-bottom: 24px; border-left: 4px solid var(--theme-primary); }
    .detail-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .meta { color: #666; font-size: 0.9rem; margin: 4px 0 0; }
    .description { color: #444; margin: 8px 0 16px; white-space: pre-line; }
    .update-row { display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
    .notes-field { flex: 1; min-width: 200px; }
    .table-card { padding: 16px; }
    .full-width { width: 100%; }
    .subject-cell { max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .empty-state { text-align: center; padding: 48px; color: #888; }
    .empty-icon { font-size: 48px; width: 48px; height: 48px; color: #ccc; display: block; margin: 0 auto 12px; }
    .selected-row { background: rgba(0,0,0,0.06); }
    .status-open { background: #fff3e0 !important; color: #e65100 !important; }
    .status-in_progress { background: #e3f2fd !important; color: #1565c0 !important; }
    .status-resolved { background: #e8f5e9 !important; color: #2e7d32 !important; }
    .status-closed { background: #f5f5f5 !important; color: #757575 !important; }
  `],
})
export class TicketManagementComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  saving = false;
  selected: Ticket | null = null;
  editStatus: Ticket['status'] = 'OPEN';
  editNotes = '';
  displayedColumns = ['id', 'order', 'customer', 'subject', 'status', 'date', 'actions'];

  constructor(private admin: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.admin.getAllTickets().subscribe({
      next: (res) => { this.tickets = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  openDetail(t: Ticket): void {
    this.selected = t;
    this.editStatus = t.status;
    this.editNotes = t.adminNotes ?? '';
  }

  saveUpdate(): void {
    if (!this.selected) return;
    this.saving = true;
    const req: TicketUpdateRequest = { status: this.editStatus, adminNotes: this.editNotes };
    this.admin.updateTicket(this.selected.id, req).subscribe({
      next: (res) => {
        const idx = this.tickets.findIndex(t => t.id === res.data.id);
        if (idx !== -1) this.tickets[idx] = res.data;
        this.selected = res.data;
        this.saving = false;
        this.snackBar.open('Ticket actualizado', 'Cerrar', { duration: 2000 });
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('Error al actualizar el ticket', 'Cerrar', { duration: 2000 });
      },
    });
  }
}
