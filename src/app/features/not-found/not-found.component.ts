import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="not-found">
      <mat-icon class="icon" aria-hidden="true">search_off</mat-icon>
      <h1>No encontramos esta página</h1>
      <p>Puede que el enlace esté mal escrito o que el producto ya no esté disponible.</p>
      <div class="actions">
        <a mat-flat-button routerLink="/">Ver productos</a>
        <a mat-button routerLink="/rastrear-pedido">Rastrear un pedido</a>
      </div>
    </section>
  `,
  styles: [`
    .not-found { max-width: 520px; margin: 64px auto; padding: 0 16px; text-align: center; }
    .icon { font-size: 56px; width: 56px; height: 56px; opacity: 0.5; }
    h1 { margin: 16px 0 8px; }
    p { opacity: 0.75; }
    .actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
  `],
})
export class NotFoundComponent {}
