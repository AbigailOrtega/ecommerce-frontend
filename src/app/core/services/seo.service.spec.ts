import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
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
});
