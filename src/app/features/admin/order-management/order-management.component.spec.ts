import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { OrderManagementComponent } from './order-management.component';

describe('OrderManagementComponent – Skydropx rate selection', () => {
  let fixture: ComponentFixture<OrderManagementComponent>;
  let component: OrderManagementComponent;
  let adminService: jasmine.SpyObj<AdminService>;

  const order: any = {
    id: 7, orderNumber: 'ORD-7', status: 'CONFIRMED', shippingType: 'NATIONAL',
    paymentMethod: 'paypal', items: [], totalAmount: 500, subtotal: 400, shippingCost: 100,
    discountAmount: 0, createdAt: '2026-11-02T10:00:00', guestEmail: 'a@b.com',
  };
  const rates = [
    { id: 'r-dhl', carrier: 'DHL', service: 'Standard', estimatedDays: 2, price: 114.31 },
    { id: 'r-paq', carrier: 'Paquetexpress', service: 'Nacional Sin Recolección', estimatedDays: 1, price: 175.38 },
  ];

  const generateButton = (): HTMLButtonElement =>
    [...fixture.nativeElement.querySelectorAll('.rates-actions button')]
      .find((b: HTMLButtonElement) => b.textContent!.includes('Generar guía'));

  beforeEach(() => {
    adminService = jasmine.createSpyObj('AdminService', ['getAllOrders', 'createSkydropxShipment']);
    adminService.getAllOrders.and.returnValue(of({ data: { content: [order], totalElements: 1 } } as any));
    adminService.createSkydropxShipment.and.returnValue(of({ data: { ...order, skydropxShipmentId: 's1' } } as any));

    TestBed.configureTestingModule({
      imports: [OrderManagementComponent],
      providers: [provideNoopAnimations(), provideRouter([]), { provide: AdminService, useValue: adminService }],
    });
    fixture = TestBed.createComponent(OrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.expandedOrderId = order.id;
    component.quotations[order.id] = { rates } as any;
    fixture.detectChanges();
  });

  it('keeps "Generar guía" disabled until a rate is chosen', () => {
    expect(generateButton().disabled).toBeTrue();
  });

  it('enables "Generar guía" when the radio circle itself is clicked', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelectorAll('.rate-item input[type=radio]')[0];
    input.click();
    fixture.detectChanges();

    expect(component.selectedRates[order.id]).toBe('r-dhl');
    expect(generateButton().disabled).toBeFalse();
  });

  it('selects a rate by clicking anywhere on its card and checks only that radio', () => {
    const cards = fixture.nativeElement.querySelectorAll('.rate-item');
    cards[0].querySelector('input[type=radio]').click();
    fixture.detectChanges();
    cards[1].querySelector('.rate-carrier').click();
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('.rate-item input[type=radio]');
    expect(component.selectedRates[order.id]).toBe('r-paq');
    expect(inputs[0].checked).toBeFalse();
    expect(inputs[1].checked).toBeTrue();
  });

  it('generates the label with the chosen rate', () => {
    fixture.nativeElement.querySelectorAll('.rate-item input[type=radio]')[1].click();
    fixture.detectChanges();
    generateButton().click();

    expect(adminService.createSkydropxShipment).toHaveBeenCalledWith(order.id, 'r-paq');
  });
});

describe('OrderManagementComponent – customer delivery instructions', () => {
  const base: any = {
    id: 8, orderNumber: 'ORD-8', status: 'CONFIRMED', shippingType: 'NATIONAL', paymentMethod: 'stripe',
    items: [], totalAmount: 500, subtotal: 400, shippingCost: 100, discountAmount: 0,
    createdAt: '2026-11-02T10:00:00', guestEmail: 'a@b.com', shippingAddress: 'Calle Falsa 123',
  };

  function render(order: any): HTMLElement {
    const adminService = jasmine.createSpyObj('AdminService', ['getAllOrders']);
    adminService.getAllOrders.and.returnValue(of({ data: { content: [order], totalElements: 1 } } as any));
    TestBed.configureTestingModule({
      imports: [OrderManagementComponent],
      providers: [provideNoopAnimations(), provideRouter([]), { provide: AdminService, useValue: adminService }],
    });
    const fixture = TestBed.createComponent(OrderManagementComponent);
    fixture.detectChanges();
    fixture.componentInstance.expandedOrderId = order.id;
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('shows what the buyer wrote in the order detail', () => {
    const el = render({ ...base, notes: 'Casa azul, tocar timbre 2' });
    expect(el.querySelector('[data-testid="order-notes"]')?.textContent).toContain('Casa azul, tocar timbre 2');
  });

  it('shows no instructions block when there are none', () => {
    const el = render({ ...base, notes: '   ' });
    expect(el.querySelector('[data-testid="order-notes"]')).toBeNull();
  });
});
