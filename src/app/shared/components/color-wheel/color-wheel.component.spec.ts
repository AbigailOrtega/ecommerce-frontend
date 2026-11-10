import { ComponentFixture, TestBed } from '@angular/core/testing';
import { hexToHsv, hsvToHex } from '@core/themes';
import { ColorWheelComponent } from './color-wheel.component';

describe('ColorWheelComponent', () => {
  let fixture: ComponentFixture<ColorWheelComponent>;
  let wheel: ColorWheelComponent;
  let emitted: string[];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ColorWheelComponent] });
    fixture = TestBed.createComponent(ColorWheelComponent);
    wheel = fixture.componentInstance;
    emitted = [];
    wheel.colorChange.subscribe(c => emitted.push(c));
    fixture.detectChanges();
  });

  it('converts hex ↔ HSV without drifting', () => {
    for (const hex of ['#1e7a7f', '#ffd740', '#ff0000', '#000000', '#ffffff', '#3f51b5']) {
      expect(hsvToHex(hexToHsv(hex))).toBe(hex);
    }
  });

  it('places the marker by hue and saturation: red at the right edge, white in the center', () => {
    wheel.color = '#ff0000';
    expect(wheel.markerX).toBeCloseTo(100, 0);
    expect(wheel.markerY).toBeCloseTo(50, 0);
    wheel.color = '#ffffff';
    expect(wheel.markerX).toBeCloseTo(50, 0);
    expect(wheel.markerY).toBeCloseTo(50, 0);
  });

  it('a color set from outside moves the marker without emitting', () => {
    wheel.color = '#1e7a7f';
    expect(wheel.hex).toBe('#1e7a7f');
    expect(emitted).toEqual([]);
  });

  it('ignores malformed colors', () => {
    wheel.color = '#1e7a7f';
    wheel.color = 'rojo';
    expect(wheel.hex).toBe('#1e7a7f');
  });

  it('keyboard: arrows on the bar change the brightness and emit the color', () => {
    wheel.color = '#808080';
    const before = wheel.hsv.v;
    wheel.barKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(wheel.hsv.v).toBeLessThan(before);
    expect(emitted.length).toBe(1);
    expect(emitted[0]).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('keyboard: arrows on the wheel turn the hue and change the saturation', () => {
    wheel.color = '#ff0000';
    wheel.wheelKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(wheel.hsv.h).toBeCloseTo(358, 0);
    wheel.wheelKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(wheel.hsv.s).toBeCloseTo(0.98, 2);
  });
});
