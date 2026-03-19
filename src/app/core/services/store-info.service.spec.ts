import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreInfoService } from './store-info.service';
import { StoreInfo, StoreImage } from '@shared/models';

const API_PUBLIC = 'http://localhost:8080/api/store-info';
const API_ADMIN  = 'http://localhost:8080/api/admin/store-info';

function makeInfo(overrides: Partial<StoreInfo> = {}): StoreInfo {
  return { name: 'Mi Tienda', aboutText: 'Desc', mission: 'M', vision: 'V', phone: '+52', images: [], ...overrides };
}

function makeImage(id: number): StoreImage {
  return { id, url: `https://img-${id}.jpg`, displayOrder: id, active: true };
}

describe('StoreInfoService', () => {
  let service: StoreInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoreInfoService],
    });
    service = TestBed.inject(StoreInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── getPublic() ────────────────────────────────────────────────────────────

  describe('getPublic()', () => {
    it('sends GET to /api/store-info', () => {
      service.getPublic().subscribe(res => {
        expect(res.data.name).toBe('Mi Tienda');
      });

      const req = httpMock.expectOne(API_PUBLIC);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makeInfo() });
    });

    it('returns images in response', () => {
      service.getPublic().subscribe(res => {
        expect(res.data.images.length).toBe(2);
      });

      const req = httpMock.expectOne(API_PUBLIC);
      req.flush({ success: true, data: makeInfo({ images: [makeImage(1), makeImage(2)] }) });
    });
  });

  // ── update() ───────────────────────────────────────────────────────────────

  describe('update()', () => {
    it('sends PUT to /api/admin/store-info with request body', () => {
      const body = { name: 'Nueva', phone: '+52 1' };

      service.update(body).subscribe();

      const req = httpMock.expectOne(API_ADMIN);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      req.flush({ success: true, data: makeInfo() });
    });
  });

  // ── addImage() ─────────────────────────────────────────────────────────────

  describe('addImage()', () => {
    it('sends POST to /api/admin/store-info/images with { url }', () => {
      service.addImage('https://new.img').subscribe();

      const req = httpMock.expectOne(`${API_ADMIN}/images`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ url: 'https://new.img' });
      req.flush({ success: true, data: makeImage(1) });
    });
  });

  // ── deleteImage() ──────────────────────────────────────────────────────────

  describe('deleteImage()', () => {
    it('sends DELETE to /api/admin/store-info/images/{id}', () => {
      service.deleteImage(7).subscribe();

      const req = httpMock.expectOne(`${API_ADMIN}/images/7`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── reorder() ──────────────────────────────────────────────────────────────

  describe('reorder()', () => {
    it('sends PUT to /api/admin/store-info/images/reorder with ids array', () => {
      service.reorder([3, 1, 2]).subscribe();

      const req = httpMock.expectOne(`${API_ADMIN}/images/reorder`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual([3, 1, 2]);
      req.flush({ success: true, data: null });
    });
  });
});
