import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../core/services/admin.service';
import { ProductService } from '../../../core/services/product.service';
import { PendingUploads } from '../../../core/utils/pending-uploads';
import { ProductManagementComponent } from './product-management.component';

describe('ProductManagementComponent — unsaved uploads', () => {
  let admin: jasmine.SpyObj<AdminService>;
  let products: jasmine.SpyObj<ProductService>;
  let discarded: string[];
  let component: ProductManagementComponent;
  let nextUrl: string;

  const file = { target: { files: [new File(['x'], 'p.png')] } } as any;

  beforeEach(() => {
    discarded = [];
    admin = jasmine.createSpyObj('AdminService', ['pendingUploads', 'uploadImage']);
    admin.pendingUploads.and.returnValue(new PendingUploads(url => discarded.push(url)));
    admin.uploadImage.and.callFake(() => of({ success: true, data: { url: nextUrl } } as any));
    products = jasmine.createSpyObj('ProductService', ['createProduct', 'updateProduct', 'getCategories']);
    products.createProduct.and.returnValue(of({ success: true, data: {} } as any));
    products.updateProduct.and.returnValue(of({ success: true, data: {} } as any));
    component = new ProductManagementComponent(new FormBuilder(), admin, products,
      jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']));
    spyOn(component, 'loadProducts');
  });

  it('discards an uploaded image removed before saving', () => {
    nextUrl = 'u1';
    component.onProductFileSelected(file);
    component.removeProductImage(0);
    expect(discarded).toEqual(['u1']);
  });

  it('does not discard a saved image removed from the form (the backend deletes it on save)', () => {
    component.editProduct({ id: 1, name: 'P', price: 1, images: ['saved'], colors: [] } as any);
    component.removeProductImage(0);
    expect(discarded).toEqual([]);
  });

  it('discards the images of a removed color and of a cancelled form', () => {
    component.addColor();
    component.addColor();
    component.currentUploadColorIndex = 0; nextUrl = 'c0'; component.onColorFileSelected(file);
    component.currentUploadColorIndex = 1; nextUrl = 'c1'; component.onColorFileSelected(file);

    component.removeColor(0);
    expect(discarded).toEqual(['c0']);

    component.resetForm();
    expect(discarded).toEqual(['c0', 'c1']);
  });

  it('on save keeps the saved images and discards uploads that were not sent', () => {
    component.form.patchValue({ name: 'P', price: 10 });
    component.addColor();
    component.colorEntries[0].name = 'Rojo';
    component.currentUploadColorIndex = 0; nextUrl = 'red'; component.onColorFileSelected(file);
    nextUrl = 'loose'; component.onProductFileSelected(file);   // ignored when the product has colors

    component.saveProduct();

    expect(discarded).toEqual(['loose']);
  });
});

describe('ProductManagementComponent — search', () => {
  let admin: jasmine.SpyObj<AdminService>;
  let component: ProductManagementComponent;

  beforeEach(() => {
    admin = jasmine.createSpyObj('AdminService', ['pendingUploads', 'getAllProducts']);
    admin.pendingUploads.and.returnValue(new PendingUploads(() => {}));
    admin.getAllProducts.and.returnValue(of({ success: true, data: { content: [], totalElements: 0 } } as any));
    component = new ProductManagementComponent(new FormBuilder(), admin,
      jasmine.createSpyObj<ProductService>('ProductService', ['getCategories']),
      jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']));
  });

  afterEach(() => component.ngOnDestroy());

  it('searches by text, price and state from the first page, after a short pause', fakeAsync(() => {
    component.currentPage = 3;
    component.filters = { q: ' vestido ', minPrice: 100, maxPrice: 200, active: 'false' };
    component.onFilterChange();
    component.onFilterChange();
    expect(admin.getAllProducts).not.toHaveBeenCalled();

    tick(300);

    expect(admin.getAllProducts).toHaveBeenCalledOnceWith(0, 20,
      { q: ' vestido ', minPrice: 100, maxPrice: 200, active: false });
    expect(component.currentPage).toBe(0);
  }));

  it('"Todos" sends no state, and clearing removes every filter', fakeAsync(() => {
    component.filters = { q: 'x', minPrice: null, maxPrice: null, active: '' };
    component.onFilterChange();
    tick(300);
    expect(admin.getAllProducts.calls.mostRecent().args[2]).toEqual({ q: 'x', minPrice: null, maxPrice: null, active: null });

    component.clearFilters();
    expect(component.hasFilters).toBeFalse();
    expect(admin.getAllProducts.calls.mostRecent().args[2]).toEqual({ q: '', minPrice: null, maxPrice: null, active: null });
  }));

  it('does not search while the minimum price is above the maximum', fakeAsync(() => {
    component.filters = { q: '', minPrice: 300, maxPrice: 100, active: '' };
    component.onFilterChange();
    tick(300);
    expect(component.priceRangeInvalid).toBeTrue();
    expect(admin.getAllProducts).not.toHaveBeenCalled();
  }));
});

describe('ProductManagementComponent — opened from a report row', () => {
  it('?edit=<id> opens that product\'s form and clears the link', () => {
    const admin = jasmine.createSpyObj('AdminService', ['pendingUploads', 'getAllProducts']);
    admin.pendingUploads.and.returnValue(new PendingUploads(() => {}));
    admin.getAllProducts.and.returnValue(of({ success: true, data: { content: [], totalElements: 0 } } as any));
    const products = jasmine.createSpyObj<ProductService>('ProductService', ['getCategories', 'getProductById']);
    products.getCategories.and.returnValue(of({ success: true, data: [] } as any));
    products.getProductById.and.returnValue(of({ success: true, data: { id: 7, name: 'Falda floral', price: 199, images: [], colors: [] } } as any));
    const route = { snapshot: { queryParamMap: { get: (k: string) => (k === 'edit' ? '7' : null) } } } as any;
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const component = new ProductManagementComponent(new FormBuilder(), admin, products,
      jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']), route, router);

    component.ngOnInit();

    expect(products.getProductById).toHaveBeenCalledWith(7);
    expect(component.editingId).toBe(7);
    expect(component.showForm).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith([], jasmine.objectContaining({ queryParams: { edit: null } }));
    component.ngOnDestroy();
  });
});
