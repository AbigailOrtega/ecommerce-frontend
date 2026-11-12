import { cleanDomain, slugify } from './platform.service';

describe('platform helpers', () => {
  it('turns a store name into its short name', () => {
    expect(slugify('Papelería Luna')).toBe('papeleria-luna');
    expect(slugify('  ¡Arte & Más!  ')).toBe('arte-mas');
  });

  it('cleans a pasted domain', () => {
    expect(cleanDomain('https://WWW.Papeleria.com/tienda')).toBe('www.papeleria.com');
    expect(cleanDomain(' papeleria-demo2.vercel.app ')).toBe('papeleria-demo2.vercel.app');
  });
});
