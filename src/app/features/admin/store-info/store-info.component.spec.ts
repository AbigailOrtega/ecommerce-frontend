import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreInfoComponent } from './store-info.component';
import { StoreInfoService } from '@core/services/store-info.service';
import { AdminService } from '@core/services/admin.service';
import { StoreInfo, StoreImage } from '@shared/models';

function makeImage(id: number): StoreImage {
  return { id, url: `https://img-${id}.jpg`, displayOrder: id, active: true };
}

function makeInfo(overrides: Partial<StoreInfo> = {}): StoreInfo {
  return {
    name: 'Mi Tienda',
    aboutText: 'Descripción',
    mission: 'Misión',
    vision: 'Visión',
    phone: '+52 55 1234',
    images: [],
    ...overrides,
  };
}

describe('Admin StoreInfoComponent', () => {
  let component: StoreInfoComponent;
  let fixture: ComponentFixture<StoreInfoComponent>;
  let storeInfoService: jasmine.SpyObj<StoreInfoService>;
  let adminService: jasmine.SpyObj<AdminService>;

  beforeEach(async () => {
    storeInfoService = jasmine.createSpyObj('StoreInfoService', [
      'getPublic', 'update', 'addImage', 'deleteImage', 'reorder',
    ]);
    adminService = jasmine.createSpyObj('AdminService', ['uploadImage']);

    storeInfoService.getPublic.and.returnValue(of({ success: true, data: makeInfo() }));

    await TestBed.configureTestingModule({
      imports: [StoreInfoComponent, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: StoreInfoService, useValue: storeInfoService },
        { provide: AdminService, useValue: adminService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // ── initialization ────────────────────────────────────────────────────────

  describe('ngOnInit()', () => {
    it('calls getPublic to load store info', () => {
      expect(storeInfoService.getPublic).toHaveBeenCalled();
    });

    it('populates form with loaded data', () => {
      expect(component.form.name).toBe('Mi Tienda');
      expect(component.form.aboutText).toBe('Descripción');
      expect(component.form.mission).toBe('Misión');
      expect(component.form.vision).toBe('Visión');
      expect(component.form.phone).toBe('+52 55 1234');
    });

    it('populates images array from response', () => {
      storeInfoService.getPublic.and.returnValue(
        of({ success: true, data: makeInfo({ images: [makeImage(1), makeImage(2)] }) })
      );
      component.ngOnInit();
      expect(component.images.length).toBe(2);
    });

    it('starts with empty images when response has none', () => {
      expect(component.images).toEqual([]);
    });
  });

  // ── save() ────────────────────────────────────────────────────────────────

  describe('save()', () => {
    beforeEach(() => {
      storeInfoService.update.and.returnValue(of({ success: true, data: makeInfo() }));
    });

    it('calls update with current form data', () => {
      component.form = { name: 'Tienda', phone: '+52' };
      component.save();
      expect(storeInfoService.update).toHaveBeenCalledWith(component.form);
    });

    it('sets saving=true before request and false after', fakeAsync(() => {
      component.save();
      // After subscription completes synchronously in test:
      expect(component.saving).toBeFalse();
      tick(3000); // flush the 3s saveSuccess hide timer
    }));

    it('shows success message after save', fakeAsync(() => {
      component.save();
      expect(component.saveSuccess).toBeTrue();
      tick(3000); // flush the 3s saveSuccess hide timer
    }));

    it('hides success message after 3 seconds', fakeAsync(() => {
      component.save();
      expect(component.saveSuccess).toBeTrue();
      tick(3000);
      expect(component.saveSuccess).toBeFalse();
    }));
  });

  // ── removeImage() ─────────────────────────────────────────────────────────

  describe('removeImage()', () => {
    beforeEach(() => {
      component.images = [makeImage(1), makeImage(2), makeImage(3)];
      storeInfoService.deleteImage.and.returnValue(of({ success: true, data: undefined }));
    });

    it('calls deleteImage with the given id', () => {
      component.removeImage(2);
      expect(storeInfoService.deleteImage).toHaveBeenCalledWith(2);
    });

    it('removes the image from the local array', () => {
      component.removeImage(2);
      expect(component.images.map(i => i.id)).not.toContain(2);
      expect(component.images.length).toBe(2);
    });

    it('leaves other images intact', () => {
      component.removeImage(2);
      expect(component.images.find(i => i.id === 1)).toBeDefined();
      expect(component.images.find(i => i.id === 3)).toBeDefined();
    });
  });

  // ── moveUp() ──────────────────────────────────────────────────────────────

  describe('moveUp()', () => {
    beforeEach(() => {
      component.images = [makeImage(1), makeImage(2), makeImage(3)];
      storeInfoService.reorder.and.returnValue(of({ success: true, data: undefined }));
    });

    it('swaps item with the one before it', () => {
      component.moveUp(1);
      expect(component.images[0].id).toBe(2);
      expect(component.images[1].id).toBe(1);
    });

    it('calls reorder with new id order', () => {
      component.moveUp(2);
      expect(storeInfoService.reorder).toHaveBeenCalledWith([1, 3, 2]);
    });

    it('does nothing when index is 0', () => {
      component.moveUp(0);
      expect(storeInfoService.reorder).not.toHaveBeenCalled();
      expect(component.images[0].id).toBe(1);
    });
  });

  // ── moveDown() ────────────────────────────────────────────────────────────

  describe('moveDown()', () => {
    beforeEach(() => {
      component.images = [makeImage(1), makeImage(2), makeImage(3)];
      storeInfoService.reorder.and.returnValue(of({ success: true, data: undefined }));
    });

    it('swaps item with the one after it', () => {
      component.moveDown(1);
      expect(component.images[1].id).toBe(3);
      expect(component.images[2].id).toBe(2);
    });

    it('calls reorder with new id order', () => {
      component.moveDown(0);
      expect(storeInfoService.reorder).toHaveBeenCalledWith([2, 1, 3]);
    });

    it('does nothing when index is last', () => {
      component.moveDown(2);
      expect(storeInfoService.reorder).not.toHaveBeenCalled();
      expect(component.images[2].id).toBe(3);
    });
  });

  // ── onFileChange() ────────────────────────────────────────────────────────

  describe('onFileChange()', () => {
    it('uploads file and adds image to list', fakeAsync(() => {
      adminService.uploadImage.and.returnValue(of({ success: true, data: { url: 'https://new.img' } }));
      storeInfoService.addImage.and.returnValue(of({ success: true, data: makeImage(99) }));

      const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
      const event = { target: { files: [file], value: '' } } as unknown as Event;
      component.onFileChange(event);
      tick();

      expect(adminService.uploadImage).toHaveBeenCalledWith(file);
      expect(storeInfoService.addImage).toHaveBeenCalledWith('https://new.img');
      expect(component.images.some(i => i.id === 99)).toBeTrue();
    }));

    it('sets uploading=false after success', fakeAsync(() => {
      adminService.uploadImage.and.returnValue(of({ success: true, data: { url: 'https://new.img' } }));
      storeInfoService.addImage.and.returnValue(of({ success: true, data: makeImage(1) }));

      const file = new File([''], 'x.jpg', { type: 'image/jpeg' });
      component.onFileChange({ target: { files: [file], value: '' } } as unknown as Event);
      tick();

      expect(component.uploading).toBeFalse();
    }));

    it('does nothing when no file is selected', () => {
      component.onFileChange({ target: { files: [], value: '' } } as unknown as Event);
      expect(adminService.uploadImage).not.toHaveBeenCalled();
    });
  });
});
