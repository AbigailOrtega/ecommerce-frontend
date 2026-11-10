import { THEMES, DEFAULT_THEME_KEY, contrastRatio, customHex, customThemeKey, deriveTheme, readableTextOn, resolveTheme } from './themes';

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
});
