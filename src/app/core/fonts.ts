export interface AppFont {
  label: string;
  fontFamily: string;
  googleUrl: string;
}

export const FONTS: Record<string, AppFont> = {
  roboto:      { label: 'Roboto',          fontFamily: "'Roboto', sans-serif",          googleUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
  inter:       { label: 'Inter',           fontFamily: "'Inter', sans-serif",           googleUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap' },
  poppins:     { label: 'Poppins',         fontFamily: "'Poppins', sans-serif",         googleUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap' },
  montserrat:  { label: 'Montserrat',      fontFamily: "'Montserrat', sans-serif",      googleUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap' },
  lato:        { label: 'Lato',            fontFamily: "'Lato', sans-serif",            googleUrl: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' },
  nunito:      { label: 'Nunito',          fontFamily: "'Nunito', sans-serif",          googleUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700&display=swap' },
  openSans:    { label: 'Open Sans',       fontFamily: "'Open Sans', sans-serif",       googleUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' },
  raleway:     { label: 'Raleway',         fontFamily: "'Raleway', sans-serif",         googleUrl: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&display=swap' },
  playfair:    { label: 'Playfair Display', fontFamily: "'Playfair Display', serif",    googleUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap' },
  merriweather: { label: 'Merriweather',   fontFamily: "'Merriweather', serif",         googleUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap' },
  josefin:     { label: 'Josefin Sans',    fontFamily: "'Josefin Sans', sans-serif",    googleUrl: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap' },
  quicksand:   { label: 'Quicksand',       fontFamily: "'Quicksand', sans-serif",       googleUrl: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap' },
};

export const DEFAULT_FONT_KEY = 'roboto';
