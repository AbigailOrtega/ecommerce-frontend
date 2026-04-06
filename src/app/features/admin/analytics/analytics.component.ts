import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '@core/services/admin.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

type Period = 'hour' | 'day' | 'week' | 'month' | 'year';

interface ChartRow { label: string; count: number; }

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [RouterLink, DecimalPipe, MatCardModule, MatButtonModule, MatIconModule, LoadingComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Analítica de Visitas</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <!-- Summary cards -->
      <div class="summary-grid">
        <mat-card class="stat-card">
          <mat-icon>today</mat-icon>
          <div>
            <h3>{{ summary['today'] | number }}</h3>
            <p>Hoy</p>
          </div>
        </mat-card>
        <mat-card class="stat-card">
          <mat-icon>date_range</mat-icon>
          <div>
            <h3>{{ summary['thisWeek'] | number }}</h3>
            <p>Esta semana</p>
          </div>
        </mat-card>
        <mat-card class="stat-card">
          <mat-icon>calendar_month</mat-icon>
          <div>
            <h3>{{ summary['thisMonth'] | number }}</h3>
            <p>Este mes</p>
          </div>
        </mat-card>
        <mat-card class="stat-card">
          <mat-icon>calendar_today</mat-icon>
          <div>
            <h3>{{ summary['thisYear'] | number }}</h3>
            <p>Este año</p>
          </div>
        </mat-card>
        <mat-card class="stat-card total">
          <mat-icon>bar_chart</mat-icon>
          <div>
            <h3>{{ summary['total'] | number }}</h3>
            <p>Total histórico</p>
          </div>
        </mat-card>
      </div>

      <!-- Period chart -->
      <mat-card class="chart-card">
        <div class="chart-header">
          <h2>Visitas por período</h2>
          <div class="period-btns">
            @for (p of periods; track p.value) {
              <button mat-stroked-button [class.active]="activePeriod === p.value"
                      (click)="selectPeriod(p.value)">{{ p.label }}</button>
            }
          </div>
        </div>

        @if (chartLoading) {
          <app-loading />
        } @else if (chartData.length === 0) {
          <p class="empty">Sin datos para este período.</p>
        } @else {
          <div class="bar-chart">
            @for (row of chartData; track row.label) {
              <div class="bar-row">
                <span class="bar-label">{{ row.label }}</span>
                <div class="bar-track">
                  <div class="bar-fill"
                       [style.width.%]="(row.count / chartMax) * 100"></div>
                </div>
                <span class="bar-count">{{ row.count | number }}</span>
              </div>
            }
          </div>
        }
      </mat-card>

      <!-- Top pages -->
      <mat-card class="chart-card">
        <div class="chart-header">
          <h2>Páginas más visitadas <span class="range-hint">(últimos 30 días)</span></h2>
        </div>

        @if (pagesLoading) {
          <app-loading />
        } @else if (pagesData.length === 0) {
          <p class="empty">Sin datos.</p>
        } @else {
          <div class="bar-chart">
            @for (row of pagesData; track row.label) {
              <div class="bar-row">
                <span class="bar-label path">{{ row.label }}</span>
                <div class="bar-track">
                  <div class="bar-fill pages"
                       [style.width.%]="(row.count / pagesMax) * 100"></div>
                </div>
                <span class="bar-count">{{ row.count | number }}</span>
              </div>
            }
          </div>
        }
      </mat-card>
    </div>
  `,
  styles: [`
    .container { max-width: 1100px; margin: 0 auto; padding: 24px 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    h1 { margin: 0; }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .stat-card {
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .stat-card mat-icon { font-size: 32px; width: 32px; height: 32px; color: #6366f1; }
    .stat-card.total mat-icon { color: #10b981; }
    .stat-card h3 { margin: 0; font-size: 1.6rem; font-weight: 700; }
    .stat-card p { margin: 2px 0 0; font-size: 0.8rem; color: #666; }

    .chart-card { padding: 20px; margin-bottom: 28px; }
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .chart-header h2 { margin: 0; }
    .range-hint { font-size: 0.8rem; color: #888; font-weight: 400; }

    .period-btns { display: flex; gap: 8px; flex-wrap: wrap; }
    .period-btns button.active {
      background: #6366f1;
      color: #fff;
      border-color: #6366f1;
    }

    .bar-chart { display: flex; flex-direction: column; gap: 8px; }
    .bar-row {
      display: grid;
      grid-template-columns: 120px 1fr 60px;
      align-items: center;
      gap: 10px;
    }
    .bar-label {
      font-size: 0.82rem;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bar-label.path { text-align: left; font-family: monospace; font-size: 0.78rem; }
    .bar-track { background: #f0f0f0; border-radius: 4px; height: 18px; overflow: hidden; }
    .bar-fill {
      height: 100%;
      background: #6366f1;
      border-radius: 4px;
      transition: width 0.3s ease;
      min-width: 2px;
    }
    .bar-fill.pages { background: #10b981; }
    .bar-count { font-size: 0.82rem; font-weight: 600; text-align: right; }

    .empty { color: #999; text-align: center; padding: 24px 0; }
  `],
})
export class AnalyticsComponent implements OnInit {
  summary: Record<string, number> = {};
  chartData: ChartRow[] = [];
  pagesData: ChartRow[] = [];
  chartMax = 1;
  pagesMax = 1;
  chartLoading = false;
  pagesLoading = false;
  activePeriod: Period = 'day';

  periods: { value: Period; label: string }[] = [
    { value: 'hour',  label: 'Hora' },
    { value: 'day',   label: 'Día' },
    { value: 'week',  label: 'Semana' },
    { value: 'month', label: 'Mes' },
    { value: 'year',  label: 'Año' },
  ];

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getPageViewSummary().subscribe({
      next: res => this.summary = res.data ?? {},
      error: () => {},
    });
    this.loadChart('day');
    this.loadPages();
  }

  selectPeriod(period: Period): void {
    if (this.activePeriod === period) return;
    this.activePeriod = period;
    this.loadChart(period);
  }

  private loadChart(period: Period): void {
    this.chartLoading = true;
    const { from, to } = this.rangeFor(period);
    this.admin.getPageViewsByPeriod(period, from, to).subscribe({
      next: res => {
        this.chartData = res.data ?? [];
        this.chartMax = this.chartData.reduce((m, r) => Math.max(m, r.count), 1);
        this.chartLoading = false;
      },
      error: () => { this.chartLoading = false; },
    });
  }

  private loadPages(): void {
    this.pagesLoading = true;
    const now = new Date();
    const from = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    this.admin.getPageViewsByPage(this.fmt(from), this.fmt(now)).subscribe({
      next: res => {
        this.pagesData = res.data ?? [];
        this.pagesMax = this.pagesData.reduce((m, r) => Math.max(m, r.count), 1);
        this.pagesLoading = false;
      },
      error: () => { this.pagesLoading = false; },
    });
  }

  private rangeFor(period: Period): { from: string; to: string } {
    const now = new Date();
    const from = new Date(now);
    switch (period) {
      case 'hour':  from.setHours(from.getHours() - 23); break;
      case 'day':   from.setDate(from.getDate() - 29); break;
      case 'week':  from.setDate(from.getDate() - 7 * 11); break;
      case 'month': from.setMonth(from.getMonth() - 11); break;
      case 'year':  from.setFullYear(from.getFullYear() - 4); break;
    }
    return { from: this.fmt(from), to: this.fmt(now) };
  }

  private fmt(d: Date): string {
    return d.toISOString().slice(0, 19);
  }
}
