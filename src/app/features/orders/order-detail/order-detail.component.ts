import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OrderService } from '@core/services/order.service';
import { TicketService } from '@core/services/ticket.service';
import { Order, Ticket } from '@shared/models';
import { PickupActions, PickupManageComponent } from '@shared/components/pickup-manage/pickup-manage.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
    selector: 'app-order-detail',
    imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule,
        MatDividerModule, MatFormFieldModule, MatInputModule, MatIconModule,
        MatDatepickerModule, MatSelectModule,
        MatSnackBarModule, CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent, PickupManageComponent],
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  showForm = false;
  submitting = false;
  ticketSubject = '';
  ticketDescription = '';
  ticket: Ticket | null = null;

  /** The account's own reschedule / cancel calls (the emailed link uses the token ones). */
  readonly pickupActions: PickupActions = {
    reschedule: (date, slotId) => this.orderService.reschedulePickup(this.order!.orderNumber, date, slotId),
    cancel: () => this.orderService.cancelOwnPickup(this.order!.orderNumber),
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private ticketService: TicketService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber')!;
    this.orderService.getOrderByNumber(orderNumber).subscribe({
      next: (res) => {
        this.order = res.data;
        this.loading = false;
        if (res.data.status === 'DELIVERED') {
          this.loadMyTicket();
        }
      },
      error: () => this.loading = false,
    });
  }

  private loadMyTicket(): void {
    this.ticketService.getMyTickets().subscribe({
      next: (res) => {
        this.ticket = res.data.find(t => t.orderNumber === this.order!.orderNumber) ?? null;
      },
    });
  }

  submitTicket(): void {
    if (!this.ticketSubject.trim() || !this.ticketDescription.trim()) return;
    this.submitting = true;
    this.ticketService.createTicket(this.order!.orderNumber, {
      subject: this.ticketSubject.trim(),
      description: this.ticketDescription.trim(),
    }).subscribe({
      next: (res) => {
        this.ticket = res.data;
        this.showForm = false;
        this.submitting = false;
        this.snackBar.open('Ticket enviado. Lo revisaremos pronto.', 'Cerrar', { duration: 4000 });
      },
      error: (err) => {
        this.submitting = false;
        this.snackBar.open(err.error?.message || 'Error al enviar el ticket', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
