export interface AppTheme {
  label: string;
  primary: string;
  primaryDark: string;
  accent: string;
}

export const THEMES: Record<string, AppTheme> = {
  azul:    { label: 'Azul',    primary: '#3f51b5', primaryDark: '#303f9f', accent: '#ff4081' },
  verde:   { label: 'Verde',   primary: '#2e7d32', primaryDark: '#1b5e20', accent: '#69f0ae' },
  naranja: { label: 'Naranja', primary: '#e65100', primaryDark: '#bf360c', accent: '#ffd740' },
  morado:  { label: 'Morado',  primary: '#6a1b9a', primaryDark: '#4a148c', accent: '#ea80fc' },
  rosa:    { label: 'Rosa',    primary: '#ad1457', primaryDark: '#880e4f', accent: '#ff80ab' },
  negro:   { label: 'Negro',   primary: '#212121', primaryDark: '#000000', accent: '#ffd740' },
};

export const DEFAULT_THEME_KEY = 'azul';
