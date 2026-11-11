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
    admin = jasmine.createSpyObj('AdminService', ['pendingUploads', 'getAllProducts', 'getProductCosts']);
    admin.getProductCosts.and.returnValue(of({ success: true, data: [] } as any));
    admin.pendingUploads.and.returnValue(new PendingUploads(() => {}));
    admin.getAllProducts.and.returnValue(of({ success: true, data: { content: [], totalElements: 0 } } as any));
    component = new ProductManagementComponent(new FormBuilder(), admin,
      jasmine.createSpyObj<ProductService>('ProductService', ['getCategories']),
      jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']));
  });

  afterEach(() => component.ngOnDestroy());

  it('searches by text, price and state from the first page, after a short pause', fakeAsync(() => {
    component.currentPage = 3;
    component.filters = { q: ' vestido ', minPrice: 100, maxPrice: 200, active: 'false', categoryId: 4 };
    component.onFilterChange();
    component.onFilterChange();
    expect(admin.getAllProducts).not.toHaveBeenCalled();

    tick(300);

    expect(admin.getAllProducts).toHaveBeenCalledOnceWith(0, 20,
      { q: ' vestido ', minPrice: 100, maxPrice: 200, active: false, categoryId: 4 });
    expect(component.currentPage).toBe(0);
  }));

  it('"Todos" sends no state, and clearing removes every filter', fakeAsync(() => {
    component.filters = { q: 'x', minPrice: null, maxPrice: null, active: '', categoryId: '' };
    component.onFilterChange();
    tick(300);
    expect(admin.getAllProducts.calls.mostRecent().args[2]).toEqual({ q: 'x', minPrice: null, maxPrice: null, active: null, categoryId: null });

    component.clearFilters();
    expect(component.hasFilters).toBeFalse();
    expect(admin.getAllProducts.calls.mostRecent().args[2]).toEqual({ q: '', minPrice: null, maxPrice: null, active: null, categoryId: null });
  }));

  it('does not search while the minimum price is above the maximum', fakeAsync(() => {
    component.filters = { q: '', minPrice: 300, maxPrice: 100, active: '', categoryId: '' };
    component.onFilterChange();
    tick(300);
    expect(component.priceRangeInvalid).toBeTrue();
    expect(admin.getAllProducts).not.toHaveBeenCalled();
  }));
});

describe('ProductManagementComponent — opened from a report row', () => {
  it('?edit=<id> opens that product\'s form and clears the link', () => {
    const admin = jasmine.createSpyObj('AdminService', ['pendingUploads', 'getAllProducts', 'getProductCosts']);
    admin.getProductCosts.and.returnValue(of({ success: true, data: [{ id: 7, costPrice: 80 }] } as any));
    admin.pendingUploads.and.returnValue(new PendingUploads(() => {}));
    admin.getAllProducts.and.returnValue(of({ success: true, data: { content: [], totalElements: 0 } } as any));
    const products = jasmine.createSpyObj<ProductService>('ProductService', ['getAdminCategories', 'getProductById']);
    products.getAdminCategories.and.returnValue(of({ success: true, data: [] } as any));
    products.getProductById.and.returnValue(of({ success: true, data: { id: 7, name: 'Falda floral', price: 199, images: [], colors: [] } } as any));
    const route = { snapshot: { queryParamMap: { get: (k: string) => (k === 'edit' ? '7' : null) } } } as any;
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const component = new ProductManagementComponent(new FormBuilder(), admin, products,
      jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']), route, router);

    component.ngOnInit();

    expect(products.getProductById).toHaveBeenCalledWith(7);
    expect(component.editingId).toBe(7);
    expect(component.showForm).toBeTrue();
    expect(component.form.value.costPrice).toBe(80);
    expect(router.navigate).toHaveBeenCalledWith([], jasmine.objectContaining({ queryParams: { edit: null } }));
    component.ngOnDestroy();
  });
});

describe('ProductManagementComponent — garment cost', () => {
  let admin: jasmine.SpyObj<AdminService>;
  let products: jasmine.SpyObj<ProductService>;
  let snack: jasmine.SpyObj<MatSnackBar>;
  let component: ProductManagementComponent;

  beforeEach(() => {
    admin = jasmine.createSpyObj('AdminService', ['pendingUploads', 'getAllProducts', 'getProductCosts', 'setProductCost']);
    admin.pendingUploads.and.returnValue(new PendingUploads(() => {}));
    admin.getAllProducts.and.returnValue(of({ success: true, data: { content: [], totalElements: 0 } } as any));
    admin.getProductCosts.and.returnValue(of({ success: true, data: [{ id: 4, costPrice: 50 }] } as any));
    admin.setProductCost.and.returnValue(of({ success: true, message: 'Costo guardado', data: 0 } as any));
    products = jasmine.createSpyObj<ProductService>('ProductService', ['getAdminCategories', 'createProduct', 'updateProduct']);
    products.getAdminCategories.and.returnValue(of({ success: true, data: [] } as any));
    products.createProduct.and.returnValue(of({ success: true, data: { id: 9 } } as any));
    products.updateProduct.and.returnValue(of({ success: true, data: { id: 4 } } as any));
    snack = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    component = new ProductManagementComponent(new FormBuilder(), admin, products, snack);
    component.ngOnInit();
  });

  afterEach(() => component.ngOnDestroy());

  it('is never sent with the product, only to the admin-only cost endpoint', () => {
    component.form.patchValue({ name: 'Blusa', price: 200, costPrice: 120 });
    component.saveProduct();

    const sent = products.createProduct.calls.mostRecent().args[0] as any;
    expect('costPrice' in sent).toBeFalse();
    expect(admin.setProductCost).toHaveBeenCalledOnceWith(9, 120);
    expect(snack.open.calls.mostRecent().args[0]).toContain('Costo guardado');
  });

  it('editing shows the saved cost, and saving without changing it does not send it again', () => {
    component.editProduct({ id: 4, name: 'Falda', price: 199, images: [], colors: [] } as any);
    expect(component.form.value.costPrice).toBe(50);
    expect(component.marginHint).toContain('75 %');

    component.saveProduct();
    expect(products.updateProduct).toHaveBeenCalled();
    expect(admin.setProductCost).not.toHaveBeenCalled();
  });

  it('clearing it removes the cost', () => {
    component.editProduct({ id: 4, name: 'Falda', price: 199, images: [], colors: [] } as any);
    component.form.patchValue({ costPrice: null });
    component.saveProduct();
    expect(admin.setProductCost).toHaveBeenCalledOnceWith(4, null);
  });
});
