import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SeoService } from '@core/services/seo.service';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('shows the current year and the store name from the store info', () => {
    TestBed.configureTestingModule({ imports: [FooterComponent], providers: [provideRouter([])] });
    TestBed.inject(SeoService).setStoreName('Marea Textiles');
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain(`© ${new Date().getFullYear()} Marea Textiles.`);
    expect(text).not.toContain('ShopHub');
  });
});
