import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ShippingService } from './core/services/shipping.service';
import { StoreInfoService } from './core/services/store-info.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="page-container">
      <router-outlet />
    </main>
    <app-footer />

    @if (whatsappNumber()) {
      <a class="whatsapp-bubble"
         [href]="'https://wa.me/' + whatsappNumber()"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Contactar por WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
          <path fill="#fff" d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.797 1.849 6.784L2 30l7.47-1.82A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.594l-.418-.248-4.432 1.08 1.115-4.303-.272-.44A11.46 11.46 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.618c-.344-.172-2.037-1.005-2.352-1.119-.315-.115-.545-.172-.775.172-.23.344-.888 1.119-1.089 1.35-.2.23-.4.258-.745.086-.344-.172-1.455-.536-2.771-1.71-1.024-.914-1.715-2.042-1.916-2.386-.2-.344-.021-.530.151-.701.155-.154.344-.402.516-.603.172-.2.23-.344.344-.573.115-.23.057-.431-.029-.603-.086-.172-.775-1.868-1.062-2.558-.28-.672-.564-.58-.775-.59l-.66-.012c-.23 0-.603.086-.918.431-.315.344-1.204 1.177-1.204 2.872 0 1.695 1.232 3.333 1.404 3.563.172.23 2.425 3.703 5.876 5.193.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.66-.099 2.037-.832 2.323-1.636.287-.804.287-1.493.2-1.636-.086-.143-.315-.23-.66-.402z"/>
        </svg>
      </a>
    }
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
    }
    .whatsapp-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      background: #25D366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 1000;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .whatsapp-bubble:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0,0,0,0.3);
    }
  `],
})
export class AppComponent implements OnInit {
  whatsappNumber = signal<string | null>(null);

  constructor(
    private shippingService: ShippingService,
    private storeInfoService: StoreInfoService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.themeService.apply(null); // apply default while loading

    this.storeInfoService.getPublic().subscribe({
      next: (res) => { this.themeService.apply(res.data?.themeKey); },
      error: () => {},
    });

    this.shippingService.getConfig().subscribe({
      next: (res) => {
        if (res.data?.whatsappNumber) {
          this.whatsappNumber.set(res.data.whatsappNumber);
        }
      },
      error: () => {},
    });
  }
}
