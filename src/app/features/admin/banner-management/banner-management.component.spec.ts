import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../core/services/admin.service';
import { PendingUploads } from '../../../core/utils/pending-uploads';
import { BannerManagementComponent } from './banner-management.component';

describe('BannerManagementComponent — unsaved uploads', () => {
  let admin: jasmine.SpyObj<AdminService>;
  let discarded: string[];
  let component: BannerManagementComponent;
  let nextUrl: string;

  const pickFile = () => component.onFileSelected({ target: { files: [new File(['x'], 'b.png')] } } as any);

  beforeEach(() => {
    discarded = [];
    admin = jasmine.createSpyObj('AdminService', ['pendingUploads', 'uploadImage', 'createBanner', 'updateBanner', 'getBanners']);
    admin.pendingUploads.and.returnValue(new PendingUploads(url => discarded.push(url)));
    admin.uploadImage.and.callFake(() => of({ success: true, data: { url: nextUrl } } as any));
    admin.createBanner.and.returnValue(of({ success: true, data: {} } as any));
    admin.getBanners.and.returnValue(of({ success: true, data: [] } as any));
    component = new BannerManagementComponent(admin, new FormBuilder(), jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']));
    component.fileInput = { nativeElement: { value: '' } } as any;
  });

  it('discards the uploaded image when the form is cancelled', () => {
    component.toggleForm();
    nextUrl = 'u1';
    pickFile();
    component.toggleForm();
    expect(discarded).toEqual(['u1']);
  });

  it('discards the first upload when another image replaces it', () => {
    nextUrl = 'u1'; pickFile();
    nextUrl = 'u2'; pickFile();
    expect(discarded).toEqual(['u1']);
    expect(component.previewUrl).toBe('u2');
  });

  it('keeps the saved image', () => {
    nextUrl = 'u1'; pickFile();
    component.save();
    expect(discarded).toEqual([]);
  });

  it('never discards the image of the banner being edited', () => {
    component.edit({ id: 1, imageUrl: 'saved', linkUrl: '' } as any);
    nextUrl = 'u1'; pickFile();
    component.toggleForm();
    expect(discarded).toEqual(['u1']);
  });
});
