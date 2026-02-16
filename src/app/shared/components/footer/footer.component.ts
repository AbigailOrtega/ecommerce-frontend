import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="container">
        <p>&copy; 2025 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: #333;
      color: #aaa;
      padding: 16px 0;
      text-align: center;
      font-size: 0.9rem;
    }
  `],
})
export class FooterComponent {}
