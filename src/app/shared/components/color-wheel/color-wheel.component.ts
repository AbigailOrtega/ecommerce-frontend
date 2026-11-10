import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { Hsv, hexToHsv, hsvToHex } from '@core/themes';

/**
 * A color wheel: the angle picks the hue, the distance from the center the saturation (white in
 * the middle), and the bar beside it the brightness. Drawn with CSS gradients; works with a mouse,
 * touch, and the keyboard (arrows: hue/saturation on the wheel, brightness on the bar).
 */
@Component({
  selector: 'app-color-wheel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="picker">
      <div #wheel class="wheel" role="slider" tabindex="0" aria-label="Tono y saturación"
           [attr.aria-valuetext]="hex" data-testid="color-wheel"
           [style.--dim]="1 - hsv.v"
           (pointerdown)="startDrag($event, 'wheel')" (keydown)="wheelKey($event)">
        <span class="marker" [style.left.%]="markerX" [style.top.%]="markerY" [style.background]="hex"></span>
      </div>
      <div #bar class="bar" role="slider" tabindex="0" aria-label="Brillo"
           aria-valuemin="0" aria-valuemax="100" [attr.aria-valuenow]="round(hsv.v * 100)"
           [style.background]="barGradient" data-testid="color-brightness"
           (pointerdown)="startDrag($event, 'bar')" (keydown)="barKey($event)">
        <span class="bar-marker" [style.top.%]="(1 - hsv.v) * 100"></span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .picker { display: flex; gap: 16px; align-items: stretch; }
    .wheel {
      position: relative; width: 220px; height: 220px; border-radius: 50%; cursor: crosshair; touch-action: none;
      /* hue around, white toward the center; darkened by the brightness bar */
      background: radial-gradient(circle closest-side, #fff, rgba(255,255,255,0)),
                  conic-gradient(from 90deg, red, yellow, lime, cyan, blue, magenta, red);
    }
    .wheel::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #000; opacity: var(--dim, 0); pointer-events: none; }
    .wheel:focus-visible, .bar:focus-visible { outline: 3px solid rgba(0,0,0,0.5); outline-offset: 3px; }
    .marker {
      position: absolute; z-index: 1; width: 16px; height: 16px; border-radius: 50%; transform: translate(-50%, -50%);
      border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4); pointer-events: none;
    }
    .bar { position: relative; width: 22px; border-radius: 11px; cursor: ns-resize; touch-action: none; border: 1px solid rgba(0,0,0,0.15); }
    .bar-marker {
      position: absolute; left: 50%; width: 28px; height: 8px; border-radius: 4px; transform: translate(-50%, -50%);
      background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.6); pointer-events: none;
    }
  `],
})
export class ColorWheelComponent {
  @ViewChild('wheel', { static: true }) wheel!: ElementRef<HTMLElement>;
  @ViewChild('bar', { static: true }) bar!: ElementRef<HTMLElement>;
  @Output() colorChange = new EventEmitter<string>();

  hsv: Hsv = { h: 180, s: 0.75, v: 0.5 };
  private readonly cdr = inject(ChangeDetectorRef);

  /** The color shown (#rrggbb). A value coming in moves the markers without emitting. */
  @Input() set color(hex: string | null) {
    if (hex && /^#[0-9a-f]{6}$/i.test(hex) && hex.toLowerCase() !== this.hex) this.hsv = hexToHsv(hex.toLowerCase());
  }

  get hex(): string { return hsvToHex(this.hsv); }

  /** Hue 0 (red) at the right, going clockwise (screen y grows downward), like the conic gradient. */
  get markerX(): number { return 50 + Math.cos(this.hsv.h * Math.PI / 180) * this.hsv.s * 50; }
  get markerY(): number { return 50 + Math.sin(this.hsv.h * Math.PI / 180) * this.hsv.s * 50; }

  get barGradient(): string {
    return `linear-gradient(to bottom, ${hsvToHex({ ...this.hsv, v: 1 })}, #000)`;
  }

  round = Math.round;

  startDrag(event: PointerEvent, target: 'wheel' | 'bar'): void {
    const el = (target === 'wheel' ? this.wheel : this.bar).nativeElement;
    el.setPointerCapture?.(event.pointerId);
    el.focus();
    const move = (e: PointerEvent) => target === 'wheel' ? this.pickOnWheel(e, el) : this.pickOnBar(e, el);
    const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    move(event);
    event.preventDefault();
  }

  private pickOnWheel(e: PointerEvent, el: HTMLElement): void {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width * 2 - 1;
    const dy = (e.clientY - r.top) / r.height * 2 - 1;
    const h = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
    this.set({ ...this.hsv, h, s: Math.min(1, Math.hypot(dx, dy)) });
  }

  private pickOnBar(e: PointerEvent, el: HTMLElement): void {
    const r = el.getBoundingClientRect();
    this.set({ ...this.hsv, v: Math.min(1, Math.max(0, 1 - (e.clientY - r.top) / r.height)) });
  }

  wheelKey(e: KeyboardEvent): void {
    const step = e.shiftKey ? 10 : 2;
    const changes: Record<string, Partial<Hsv>> = {
      ArrowLeft: { h: (this.hsv.h + step + 360) % 360 }, ArrowRight: { h: (this.hsv.h - step + 360) % 360 },
      ArrowUp: { s: Math.min(1, this.hsv.s + step / 100) }, ArrowDown: { s: Math.max(0, this.hsv.s - step / 100) },
    };
    if (changes[e.key]) { this.set({ ...this.hsv, ...changes[e.key] }); e.preventDefault(); }
  }

  barKey(e: KeyboardEvent): void {
    const step = (e.shiftKey ? 10 : 2) / 100;
    const v = e.key === 'ArrowUp' ? this.hsv.v + step : e.key === 'ArrowDown' ? this.hsv.v - step : null;
    if (v !== null) { this.set({ ...this.hsv, v: Math.min(1, Math.max(0, v)) }); e.preventDefault(); }
  }

  private set(hsv: Hsv): void {
    this.hsv = hsv;
    this.cdr.markForCheck();   // pointermove listeners are added by hand, outside the template
    this.colorChange.emit(this.hex);
  }
}
