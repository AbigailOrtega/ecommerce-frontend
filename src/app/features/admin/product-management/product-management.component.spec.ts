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
