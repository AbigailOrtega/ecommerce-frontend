import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let seo: SeoService;
  let title: Title;

  beforeEach(() => {
    seo = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
  });

  it('titles a page with the store name once the store info brings it, even after the page', () => {
    seo.update({ title: 'Página no encontrada' });
    expect(title.getTitle()).toBe('Página no encontrada');

    seo.setStoreName('Papelería Luna');
    expect(title.getTitle()).toBe('Página no encontrada | Papelería Luna');
  });

  it('a page without its own title is titled with the store name', () => {
    seo.setStoreName('Papelería Luna');
    seo.update({});
    expect(title.getTitle()).toBe('Papelería Luna');
  });

  it("pages without their own description use the store's text, also when it arrives later", () => {
    const meta = TestBed.inject(Meta);
    seo.reset('Contacto', '/contacto', false);
    seo.setStoreName('Papelería Luna');
    expect(meta.getTag('name="description"')?.content).toBe('Compra en línea en Papelería Luna.');
    seo.setStoreDescription('Cuadernos, plumas y arte.');
    expect(meta.getTag('name="description"')?.content).toBe('Cuadernos, plumas y arte.');

    // a product keeps its own description
    seo.update({ title: 'Lápiz', description: 'Un lápiz HB' });
    seo.setStoreDescription('Otro texto');
    expect(meta.getTag('name="description"')?.content).toBe('Un lápiz HB');
  });
});
