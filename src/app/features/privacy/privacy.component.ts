import { Component, OnInit } from '@angular/core';
import { StoreInfoService } from '@core/services/store-info.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [LoadingComponent],
  template: `
    <div class="container privacy-page">
      <h1>Aviso de Privacidad</h1>
      @if (loading) {
        <app-loading />
      } @else if (text) {
        <div class="privacy-body">{{ text }}</div>
      } @else {
        <p class="empty-msg">El aviso de privacidad aún no ha sido configurado.</p>
      }
    </div>
  `,
  styles: [`
    .privacy-page { padding: 32px 16px 64px; max-width: 800px; }
    h1 { font-size: 1.8rem; color: #1a1a2e; margin-bottom: 28px; }
    .privacy-body {
      font-size: 0.95rem; line-height: 1.85; color: #444;
      white-space: pre-line;
      background: #fafafa; border: 1px solid #e8e8e8;
      border-radius: 10px; padding: 28px 32px;
    }
    .empty-msg { color: #888; }
  `],
})
export class PrivacyComponent implements OnInit {
  text: string | null = null;
  loading = true;

  constructor(private storeInfoService: StoreInfoService) {}

  ngOnInit(): void {
    this.storeInfoService.getPublic().subscribe({
      next: (res) => { this.text = res.data?.privacyPolicy ?? null; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
