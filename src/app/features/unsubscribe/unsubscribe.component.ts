import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="unsub-container">
      @if (loading) {
        <mat-spinner diameter="48"></mat-spinner>
        <p class="status-text">Procesando solicitud...</p>
      } @else if (success) {
        <mat-icon class="icon-ok">check_circle</mat-icon>
        <h2>¡Listo!</h2>
        <p>Has sido dado de baja de nuestros correos promocionales correctamente.</p>
        <p class="sub-text">Ya no recibirás boletines ni promociones. Los correos sobre tus pedidos seguirán llegando normalmente.</p>
        <a mat-stroked-button routerLink="/">Ir a la tienda</a>
      } @else {
        <mat-icon class="icon-err">error_outline</mat-icon>
        <h2>Enlace inválido</h2>
        <p>El enlace de desuscripción no es válido o ya fue utilizado.</p>
        <a mat-stroked-button routerLink="/">Ir a la tienda</a>
      }
    </div>
  `,
  styles: [`
    .unsub-container {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 60vh; padding: 40px 24px; text-align: center; gap: 16px;
    }
    .icon-ok { font-size: 64px; width: 64px; height: 64px; color: #4caf50; }
    .icon-err { font-size: 64px; width: 64px; height: 64px; color: #f44336; }
    h2 { font-size: 1.6rem; margin: 0; color: #1a1a2e; }
    p { font-size: 1rem; color: #555; max-width: 420px; margin: 0; }
    .sub-text { font-size: 0.88rem; color: #888; }
    .status-text { color: #888; }
  `],
})
export class UnsubscribeComponent implements OnInit {
  loading = true;
  success = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) { this.loading = false; return; }

    this.http.get(`${environment.apiUrl}/marketing/unsubscribe`, { params: { token } }).subscribe({
      next: () => { this.loading = false; this.success = true; },
      error: () => { this.loading = false; this.success = false; },
    });
  }
}
