import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AboutComponent } from './about.component';
import { StoreInfoService } from '@core/services/store-info.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreInfo, StoreImage } from '@shared/models';

function makeImage(id: number): StoreImage {
  return { id, url: `https://img-${id}.jpg`, displayOrder: id, active: true };
}

function makeInfo(overrides: Partial<StoreInfo> = {}): StoreInfo {
  return {
    name: 'Mi Tienda',
    aboutText: 'Sobre nosotros',
    mission: 'Misión',
    vision: 'Visión',
    phone: '+52 55 1234',
    images: [],
    ...overrides,
  };
}

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let storeInfoService: jasmine.SpyObj<StoreInfoService>;

  beforeEach(async () => {
    storeInfoService = jasmine.createSpyObj('StoreInfoService', ['getPublic']);

    await TestBed.configureTestingModule({
      imports: [AboutComponent, NoopAnimationsModule],
      providers: [{ provide: StoreInfoService, useValue: storeInfoService }],
    }).compileComponents();
  });

  function createComponent(info: StoreInfo): void {
    storeInfoService.getPublic.and.returnValue(of({ success: true, data: info }));
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should be created', () => {
    createComponent(makeInfo());
    expect(component).toBeTruthy();
  });

  // ── initialization ────────────────────────────────────────────────────────

  describe('initialization', () => {
    it('calls getPublic on init', () => {
      createComponent(makeInfo());
      expect(storeInfoService.getPublic).toHaveBeenCalled();
    });

    it('sets info and loading=false on success', () => {
      createComponent(makeInfo());
      expect(component.info?.name).toBe('Mi Tienda');
      expect(component.loading).toBeFalse();
    });

    it('populates images from response', () => {
      createComponent(makeInfo({ images: [makeImage(1), makeImage(2)] }));
      expect(component.images.length).toBe(2);
    });

    it('sets loading=false and info=null on error', () => {
      storeInfoService.getPublic.and.returnValue(throwError(() => new Error('error')));
      fixture = TestBed.createComponent(AboutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.loading).toBeFalse();
      expect(component.info).toBeNull();
    });

    it('starts at currentIndex=0', () => {
      createComponent(makeInfo({ images: [makeImage(1), makeImage(2)] }));
      expect(component.currentIndex).toBe(0);
    });
  });

  // ── carousel navigation ───────────────────────────────────────────────────

  describe('next()', () => {
    beforeEach(() => createComponent(makeInfo({ images: [makeImage(1), makeImage(2), makeImage(3)] })));

    it('advances to the next image', () => {
      component.next();
      expect(component.currentIndex).toBe(1);
    });

    it('wraps around from last to first', () => {
      component.currentIndex = 2;
      component.next();
      expect(component.currentIndex).toBe(0);
    });
  });

  describe('prev()', () => {
    beforeEach(() => createComponent(makeInfo({ images: [makeImage(1), makeImage(2), makeImage(3)] })));

    it('goes to the previous image', () => {
      component.currentIndex = 2;
      component.prev();
      expect(component.currentIndex).toBe(1);
    });

    it('wraps around from first to last', () => {
      component.currentIndex = 0;
      component.prev();
      expect(component.currentIndex).toBe(2);
    });
  });

  describe('goTo()', () => {
    beforeEach(() => createComponent(makeInfo({ images: [makeImage(1), makeImage(2), makeImage(3)] })));

    it('sets currentIndex to the given index', () => {
      component.goTo(2);
      expect(component.currentIndex).toBe(2);
    });
  });

  // ── autoplay ──────────────────────────────────────────────────────────────

  describe('autoplay', () => {
    it('advances slide every 5 seconds when more than 1 image', fakeAsync(() => {
      createComponent(makeInfo({ images: [makeImage(1), makeImage(2)] }));

      expect(component.currentIndex).toBe(0);
      tick(5000);
      expect(component.currentIndex).toBe(1);

      component.ngOnDestroy();
      tick(5000);
    }));

    it('does not autoplay when only 1 image', fakeAsync(() => {
      createComponent(makeInfo({ images: [makeImage(1)] }));

      tick(5000);
      expect(component.currentIndex).toBe(0);

      component.ngOnDestroy();
    }));

    it('does not autoplay when images array is empty', fakeAsync(() => {
      createComponent(makeInfo({ images: [] }));

      tick(10000);
      expect(component.currentIndex).toBe(0);

      component.ngOnDestroy();
    }));

    it('stops autoplay on destroy', fakeAsync(() => {
      createComponent(makeInfo({ images: [makeImage(1), makeImage(2)] }));

      component.ngOnDestroy();
      tick(10000);

      // Index should not have advanced after destroy
      expect(component.currentIndex).toBe(0);
    }));

    it('resets timer on goTo()', fakeAsync(() => {
      createComponent(makeInfo({ images: [makeImage(1), makeImage(2), makeImage(3)] }));

      tick(4000);
      component.goTo(2);       // Reset timer
      tick(4900);
      expect(component.currentIndex).toBe(2); // Timer reset so slide has NOT advanced yet

      component.ngOnDestroy();
      tick(5000);
    }));
  });
});
