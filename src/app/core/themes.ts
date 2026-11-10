export interface AppTheme {
  label: string;
  primary: string;
  primaryDark: string;
  accent: string;
}

export const THEMES: Record<string, AppTheme> = {
  azul:        { label: 'Azul',           primary: '#3f51b5', primaryDark: '#303f9f', accent: '#ff4081' },
  verde:       { label: 'Verde',          primary: '#2e7d32', primaryDark: '#1b5e20', accent: '#69f0ae' },
  naranja:     { label: 'Naranja',        primary: '#e65100', primaryDark: '#bf360c', accent: '#ffd740' },
  morado:      { label: 'Morado',         primary: '#6a1b9a', primaryDark: '#4a148c', accent: '#ea80fc' },
  rosa:        { label: 'Rosa',           primary: '#ad1457', primaryDark: '#880e4f', accent: '#ff80ab' },
  negro:       { label: 'Negro',          primary: '#212121', primaryDark: '#000000', accent: '#ffd740' },
  rojo:        { label: 'Rojo',           primary: '#c62828', primaryDark: '#8e0000', accent: '#ffd740' },
  cian:        { label: 'Cian',           primary: '#00838f', primaryDark: '#005662', accent: '#ff6e40' },
  azulOscuro:  { label: 'Azul marino',    primary: '#1a237e', primaryDark: '#000051', accent: '#40c4ff' },
  verde2:      { label: 'Menta',          primary: '#00695c', primaryDark: '#004d40', accent: '#ffd740' },
  cafe:        { label: 'Café',           primary: '#4e342e', primaryDark: '#260e04', accent: '#ffab40' },
  amarillo:    { label: 'Ámbar',          primary: '#f57f17', primaryDark: '#bc5100', accent: '#1de9b6' },
  grisAzul:    { label: 'Gris azulado',   primary: '#455a64', primaryDark: '#1c313a', accent: '#ff6e40' },
  limon:       { label: 'Lima',           primary: '#558b2f', primaryDark: '#255d00', accent: '#ff6d00' },
  salmon:      { label: 'Salmón',         primary: '#d84315', primaryDark: '#9f0000', accent: '#ffd740' },
  lavanda:     { label: 'Lavanda',        primary: '#7b1fa2', primaryDark: '#4a0072', accent: '#69f0ae' },
};

export const DEFAULT_THEME_KEY = 'azul';

// ── Custom color ──────────────────────────────────────────────────────────────
// Besides the palettes above, the admin can pick any color; it is stored as "custom:#rrggbb" in
// the store info's themeKey, and the rest of the palette is derived from it.

const HEX = /^#[0-9a-f]{6}$/i;
const CUSTOM_PREFIX = 'custom:';

/** A palette plus the text color that reads best on its primary and accent colors. */
export interface ResolvedTheme extends AppTheme {
  onPrimary: string;
  onAccent: string;
}

export function customThemeKey(hex: string): string {
  return CUSTOM_PREFIX + hex.toLowerCase();
}

/** The hex color of a custom theme key ("custom:#1e7a7f"), or null for any other key. */
export function customHex(themeKey: string | null | undefined): string | null {
  if (!themeKey?.startsWith(CUSTOM_PREFIX)) return null;
  const hex = themeKey.slice(CUSTOM_PREFIX.length);
  return HEX.test(hex) ? hex.toLowerCase() : null;
}

/**
 * The palette for a theme key: one of THEMES, a valid custom color, or the default. Only these
 * values ever reach the page's CSS (a malformed key falls back to the default).
 */
export function resolveTheme(themeKey: string | null | undefined): ResolvedTheme {
  const hex = customHex(themeKey);
  const base: AppTheme = hex ? deriveTheme(hex)
    : THEMES[themeKey && THEMES[themeKey] ? themeKey : DEFAULT_THEME_KEY];
  return { ...base, onPrimary: readableTextOn(base.primary), onAccent: readableTextOn(base.accent) };
}

/** Darker shade for hover/headers, and an accent on the opposite side of the color wheel. */
export function deriveTheme(hex: string): AppTheme {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  return {
    label: 'Personalizado',
    primary: hex.toLowerCase(),
    primaryDark: hslToHex(h, s, Math.max(0, l * 0.7)),
    accent: hslToHex((h + 180) % 360, Math.max(0.65, s), 0.55),
  };
}

/** White or near-black, whichever contrasts more with the background (WCAG contrast ratio). */
export function readableTextOn(background: string): string {
  const bg = relativeLuminance(hexToRgb(background));
  const onWhite = (1 + 0.05) / (bg + 0.05);
  const onBlack = (bg + 0.05) / (0 + 0.05);
  return onWhite >= onBlack ? '#ffffff' : '#212121';
}

export function contrastRatio(a: string, b: string): number {
  const [la, lb] = [relativeLuminance(hexToRgb(a)), relativeLuminance(hexToRgb(b))];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255];
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === rr ? (gg - bb) / d + (gg < bb ? 6 : 0) : max === gg ? (bb - rr) / d + 2 : (rr - gg) / d + 4;
  return [h * 60, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}
