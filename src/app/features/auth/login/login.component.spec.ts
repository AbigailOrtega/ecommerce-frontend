import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '@core/services/auth.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let snackBarOpenSpy: jasmine.Spy;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    snackBarOpenSpy = spyOn((component as any).snackBar, 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders email and password fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
  });

  it('form is invalid when empty', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('form is valid with email and password', () => {
    component.form.setValue({ email: 'a@a.com', password: 'secret' });
    expect(component.form.valid).toBeTrue();
  });

  it('does not call login when form is invalid', () => {
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('calls auth.login and navigates to / on success', () => {
    authService.login.and.returnValue(of({ success: true, data: {} as any }));
    component.form.setValue({ email: 'a@a.com', password: 'secret' });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ email: 'a@a.com', password: 'secret' });
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('shows snackbar and resets loading on error', () => {
    authService.login.and.returnValue(throwError(() => ({ error: { message: 'Bad credentials' } })));
    component.form.setValue({ email: 'a@a.com', password: 'wrong' });

    component.onSubmit();

    expect(snackBarOpenSpy).toHaveBeenCalledWith('Bad credentials', 'Cerrar', jasmine.any(Object));
    expect(component.loading).toBeFalse();
  });
});
