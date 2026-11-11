import { visibleCategories } from './visible-categories';

describe('visibleCategories', () => {
  it('leaves out the hidden ones and keeps those without the flag', () => {
    const cats = [
      { id: 1, name: 'Ropa', slug: 'ropa', visible: true },
      { id: 2, name: 'Bodega', slug: 'bodega', visible: false },
      { id: 3, name: 'Calzado', slug: 'calzado' },
    ];
    expect(visibleCategories(cats).map(c => c.id)).toEqual([1, 3]);
    expect(visibleCategories(undefined)).toEqual([]);
  });
});
