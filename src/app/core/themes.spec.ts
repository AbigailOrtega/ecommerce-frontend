import { THEMES, DEFAULT_THEME_KEY, contrastRatio, customHex, customThemeKey, deriveTheme, readableOnWhite, readableTextOn, resolveTheme } from './themes';

describe('store themes', () => {
  describe('custom color keys', () => {
    it('round-trips a color through the stored key', () => {
      expect(customThemeKey('#1E7A7F')).toBe('custom:#1e7a7f');
      expect(customHex('custom:#1e7a7f')).toBe('#1e7a7f');
    });

    it('is not a custom color for palettes, empty or malformed keys', () => {
      expect(customHex('azul')).toBeNull();
      expect(customHex(null)).toBeNull();
      expect(customHex('custom:#12345')).toBeNull();
      expect(customHex('custom:red')).toBeNull();
    });
  });

  describe('resolveTheme', () => {
    it('uses the palette for a palette key', () => {
      expect(resolveTheme('verde').primary).toBe(THEMES['verde'].primary);
    });

    it('derives the palette from a custom color', () => {
      const t = resolveTheme('custom:#1e7a7f');
      expect(t.primary).toBe('#1e7a7f');
      expect(t.primaryDark).not.toBe('#1e7a7f');
      expect(t.accent).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('never lets anything but a color into the CSS: malformed keys fall back to the default', () => {
      for (const key of ['custom:#1e7a7f;}body{display:none', 'azul;}*{color:red', 'nope', undefined]) {
        expect(resolveTheme(key).primary).toBe(THEMES[DEFAULT_THEME_KEY].primary);
      }
    });
  });

  describe('derived colors', () => {
    it('the dark shade is darker than the color', () => {
      const t = deriveTheme('#1e7a7f');
      expect(contrastRatio(t.primaryDark, '#ffffff')).toBeGreaterThan(contrastRatio(t.primary, '#ffffff'));
    });

    it('text on a dark color is white, on a light color dark, and always readable (WCAG AA for large text)', () => {
      expect(readableTextOn('#1e7a7f')).toBe('#ffffff');
      expect(readableTextOn('#ffd740')).toBe('#212121');
      expect(readableTextOn('#f5f5f5')).toBe('#212121');
      for (const color of ['#1e7a7f', '#ffd740', '#f5f5f5', '#ff4081', '#00ff00', '#0000ff', '#808080']) {
        expect(contrastRatio(color, readableTextOn(color))).toBeGreaterThanOrEqual(3);
      }
    });

    it('every built-in palette keeps white text on its primary color', () => {
      for (const [key, t] of Object.entries(THEMES)) {
        expect(resolveTheme(key).onPrimary).withContext(key).toBe(readableTextOn(t.primary));
      }
    });
  });
  describe('primary color as text on white (prices, links)', () => {
    it('a pale color is darkened, keeping its hue, until it reads (WCAG AA 4.5:1)', () => {
      const text = readableOnWhite('#c8e6c9');   // pale green, like the store's
      expect(contrastRatio(text, '#ffffff')).toBeGreaterThanOrEqual(4.5);
      expect(text).not.toBe('#212121');
      const [r, g, b] = [1, 3, 5].map(i => parseInt(text.slice(i, i + 2), 16));
      expect(g).toBeGreaterThan(r);   // still green
      expect(g).toBeGreaterThan(b);
    });

    it('a color that already reads is left as it is', () => {
      expect(readableOnWhite('#3f51b5')).toBe('#3f51b5');
      expect(readableOnWhite('#1e7a7f')).toBe('#1e7a7f');
    });

    it('works for any color, even white', () => {
      for (const c of ['#ffffff', '#ffd740', '#00ff00', '#ff80ab', '#e0f7fa']) {
        expect(contrastRatio(readableOnWhite(c), '#ffffff')).withContext(c).toBeGreaterThanOrEqual(4.5);
      }
    });
  });
});
