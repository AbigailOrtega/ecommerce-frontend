import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="container footer-inner">
        <p>&copy; 2025 ShopHub. Todos los derechos reservados.</p>
        <a routerLink="/aviso-privacidad">Aviso de Privacidad</a>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: #333;
      color: #aaa;
      padding: 16px 0;
      font-size: 0.9rem;
    }
    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    a {
      color: #ccc;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.15s;
    }
    a:hover { color: #fff; }
  `],
})
export class FooterComponent {}
