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
