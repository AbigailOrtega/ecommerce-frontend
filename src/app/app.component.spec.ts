import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { ShippingService } from './core/services/shipping.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({ selector: 'app-navbar', template: '', standalone: true })
class MockNavbarComponent {}

@Component({ selector: 'app-footer', template: '', standalone: true })
class MockFooterComponent {}

const mockShippingService = (whatsappNumber: string | null) => ({
  getConfig: () => of({ success: true, data: { whatsappNumber, pickupEnabled: true, nationalEnabled: true, nationalBasePrice: 0, nationalPricePerKm: 0, pickupCost: 0 } }),
});

describe('AppComponent — WhatsApp bubble', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  async function createComponent(whatsappNumber: string | null) {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: ShippingService, useValue: mockShippingService(whatsappNumber) },
      ],
    })
    .overrideComponent(AppComponent, {
      remove: { imports: [NavbarComponent, FooterComponent] },
      add:    { imports: [MockNavbarComponent, MockFooterComponent] },
    })
    .compileComponents();

    fixture  = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  }

  afterEach(() => TestBed.resetTestingModule());

  it('shows the WhatsApp bubble when a number is configured', async () => {
    await createComponent('5215512345678');
    const bubble = compiled.querySelector('.whatsapp-bubble') as HTMLAnchorElement;
    expect(bubble).toBeTruthy();
  });

  it('links to the correct wa.me URL', async () => {
    await createComponent('5215512345678');
    const bubble = compiled.querySelector('.whatsapp-bubble') as HTMLAnchorElement;
    expect(bubble.href).toContain('wa.me/5215512345678');
  });

  it('opens in a new tab', async () => {
    await createComponent('5215512345678');
    const bubble = compiled.querySelector('.whatsapp-bubble') as HTMLAnchorElement;
    expect(bubble.target).toBe('_blank');
  });

  it('does NOT render the bubble when no number is configured', async () => {
    await createComponent(null);
    expect(compiled.querySelector('.whatsapp-bubble')).toBeNull();
  });

  it('does NOT render the bubble when number is empty string', async () => {
    await createComponent('');
    expect(compiled.querySelector('.whatsapp-bubble')).toBeNull();
  });

  it('does NOT render the bubble when whatsappNumber is cleared', async () => {
    await createComponent('5215512345678');
    fixture.componentInstance.whatsappNumber.set(null);
    fixture.detectChanges();
    expect(compiled.querySelector('.whatsapp-bubble')).toBeNull();
  });

  it('does NOT render the bubble when ShippingService fails', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: ShippingService, useValue: { getConfig: () => throwError(() => new Error('network')) } },
      ],
    })
    .overrideComponent(AppComponent, {
      remove: { imports: [NavbarComponent, FooterComponent] },
      add:    { imports: [MockNavbarComponent, MockFooterComponent] },
    })
    .compileComponents();

    fixture  = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    expect(compiled.querySelector('.whatsapp-bubble')).toBeNull();
  });
});
