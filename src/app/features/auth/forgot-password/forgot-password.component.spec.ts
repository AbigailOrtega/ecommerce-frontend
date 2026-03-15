import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from '@core/services/auth.service';

describe('ForgotPasswordComponent', () => {
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let component: ForgotPasswordComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBarOpenSpy: jasmine.Spy;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['forgotPassword']);

    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    snackBarOpenSpy = spyOn((component as any).snackBar, 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts in form state (submitted = false)', () => {
    expect(component.submitted).toBeFalse();
  });

  it('form is invalid when email is empty', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('form is invalid with a non-email value', () => {
    component.form.setValue({ email: 'not-an-email' });
    expect(component.form.invalid).toBeTrue();
  });

  it('form is valid with a proper email', () => {
    component.form.setValue({ email: 'a@a.com' });
    expect(component.form.valid).toBeTrue();
  });

  it('does not call forgotPassword when form is invalid', () => {
    component.onSubmit();
    expect(authService.forgotPassword).not.toHaveBeenCalled();
  });

  it('sets submitted = true and stops loading on success', () => {
    authService.forgotPassword.and.returnValue(of({ success: true, data: undefined }));
    component.form.setValue({ email: 'a@a.com' });

    component.onSubmit();

    expect(authService.forgotPassword).toHaveBeenCalledWith('a@a.com');
    expect(component.submitted).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('shows snackbar and resets loading on error', () => {
    authService.forgotPassword.and.returnValue(throwError(() => new Error('Server error')));
    component.form.setValue({ email: 'a@a.com' });

    component.onSubmit();

    expect(snackBarOpenSpy).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.submitted).toBeFalse();
  });
});
