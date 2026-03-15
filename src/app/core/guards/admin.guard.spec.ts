import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';

describe('adminGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  function runGuard(): boolean | ReturnType<typeof adminGuard> {
    return TestBed.runInInjectionContext(() => adminGuard(mockRoute, mockState));
  }

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAdmin']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('returns true when user is admin', () => {
    authService.isAdmin.and.returnValue(true);
    expect(runGuard()).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('redirects to / and returns false when user is not admin', () => {
    authService.isAdmin.and.returnValue(false);
    expect(runGuard()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
