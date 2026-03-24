import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { StoreInfoService } from './core/services/store-info.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({ selector: 'app-navbar', template: '', standalone: true })
class MockNavbarComponent {}

@Component({ selector: 'app-footer', template: '', standalone: true })
class MockFooterComponent {}

const mockStoreInfoService = (whatsappNumber: string | null) => ({
  getPublic: () => of({ success: true, data: { whatsappNumber, name: 'Test', images: [] } }),
});

describe('AppComponent — WhatsApp bubble', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  async function createComponent(whatsappNumber: string | null) {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: StoreInfoService, useValue: mockStoreInfoService(whatsappNumber) },
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

  it('does NOT render the bubble when StoreInfoService fails', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: StoreInfoService, useValue: { getPublic: () => throwError(() => new Error('network')) } },
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
