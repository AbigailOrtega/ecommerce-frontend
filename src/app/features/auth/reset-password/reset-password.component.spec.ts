import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '@core/services/auth.service';

function createRoute(token: string | null) {
  return {
    snapshot: { queryParamMap: { get: (key: string) => (key === 'token' ? token : null) } },
  };
}

describe('ResetPasswordComponent', () => {
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let component: ResetPasswordComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let snackBarOpenSpy: jasmine.Spy;

  async function setup(token: string | null) {
    authService = jasmine.createSpyObj('AuthService', ['resetPassword']);

    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService },
        { provide: ActivatedRoute, useValue: createRoute(token) },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    snackBarOpenSpy = spyOn((component as any).snackBar, 'open');
    fixture.detectChanges();
  }

  describe('when token is present in URL', () => {
    beforeEach(async () => setup('valid-uuid-token'));

    it('should create', () => expect(component).toBeTruthy());

    it('reads token from query params on init', () => {
      expect(component.token).toBe('valid-uuid-token');
    });

    it('form is invalid when passwords are empty', () => {
      expect(component.form.invalid).toBeTrue();
    });

    it('form is invalid when passwords do not match', () => {
      component.form.setValue({ newPassword: 'password1', confirmPassword: 'password2' });
      expect(component.form.hasError('passwordsMismatch')).toBeTrue();
    });

    it('form is valid when passwords match and meet length', () => {
      component.form.setValue({ newPassword: 'password1', confirmPassword: 'password1' });
      expect(component.form.valid).toBeTrue();
    });

    it('does not call resetPassword when form is invalid', () => {
      component.onSubmit();
      expect(authService.resetPassword).not.toHaveBeenCalled();
    });

    it('calls resetPassword and navigates to /login on success', () => {
      authService.resetPassword.and.returnValue(of({ success: true, data: undefined }));
      component.form.setValue({ newPassword: 'newPass123', confirmPassword: 'newPass123' });

      component.onSubmit();

      expect(authService.resetPassword).toHaveBeenCalledWith('valid-uuid-token', 'newPass123');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(snackBarOpenSpy).toHaveBeenCalledWith('Password updated successfully.', 'Close', jasmine.any(Object));
    });

    it('shows error snackbar and resets loading on API error', () => {
      authService.resetPassword.and.returnValue(
        throwError(() => ({ error: { message: 'Invalid or expired token' } }))
      );
      component.form.setValue({ newPassword: 'newPass123', confirmPassword: 'newPass123' });

      component.onSubmit();

      expect(snackBarOpenSpy).toHaveBeenCalledWith('Invalid or expired token', 'Close', jasmine.any(Object));
      expect(component.loading).toBeFalse();
    });
  });

  describe('when token is missing from URL', () => {
    beforeEach(async () => setup(null));

    it('token is null after init', () => {
      expect(component.token).toBeNull();
    });

    it('does not submit even if form data is set', () => {
      component.form.setValue({ newPassword: 'newPass123', confirmPassword: 'newPass123' });
      component.onSubmit();
      expect(authService.resetPassword).not.toHaveBeenCalled();
    });
  });
});
