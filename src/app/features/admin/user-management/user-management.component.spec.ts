import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AdminService } from '@core/services/admin.service';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/models';
import { UserManagementComponent } from './user-management.component';

describe('UserManagementComponent — admin access', () => {
  const me: User = { id: 1, firstName: 'Boss', lastName: 'A', email: 'boss@shop.com', role: 'ADMIN' };
  const otherAdmin: User = { id: 2, firstName: 'Ana', lastName: 'B', email: 'ana@shop.com', role: 'ADMIN' };
  const customer: User = { id: 3, firstName: 'Leo', lastName: 'C', email: 'leo@shop.com', role: 'CUSTOMER' };

  let admin: jasmine.SpyObj<AdminService>;
  let fixture: ComponentFixture<UserManagementComponent>;
  let component: UserManagementComponent;

  const buttons = () => Array.from(fixture.nativeElement.querySelectorAll('td button')) as HTMLButtonElement[];
  const rowButton = (email: string) => {
    const row = Array.from(fixture.nativeElement.querySelectorAll('tr') as NodeListOf<HTMLElement>)
      .find(r => r.textContent!.includes(email))!;
    return row.querySelector('td button') as HTMLButtonElement | null;
  };

  beforeEach(fakeAsync(() => {
    admin = jasmine.createSpyObj('AdminService', ['getAllUsers', 'inviteAdmin', 'revokeAdmin']);
    admin.getAllUsers.and.returnValue(of({ success: true, data: { content: [me, otherAdmin, customer], totalElements: 3 } } as any));
    admin.inviteAdmin.and.returnValue(of({ success: true, message: 'ok', data: customer } as any));
    admin.revokeAdmin.and.returnValue(of({ success: true, message: 'ok', data: otherAdmin } as any));

    TestBed.configureTestingModule({
      imports: [UserManagementComponent],
      providers: [
        provideNoopAnimations(),
        provideRouter([]),
        { provide: AdminService, useValue: admin },
        { provide: AuthService, useValue: { user: () => me } },
      ],
    });
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it('offers "Quitar admin" for other admins, "Hacer admin" for customers, nothing on your own row', () => {
    expect(rowButton('boss@shop.com')).toBeNull();
    expect(rowButton('ana@shop.com')?.textContent).toContain('Quitar admin');
    expect(rowButton('leo@shop.com')?.textContent).toContain('Hacer admin');
    expect(buttons().length).toBe(2);
  });

  it('invites by email with the optional names, then clears the form and reloads', () => {
    component.inviteForm.setValue({ email: 'new@shop.com', firstName: 'Sofía', lastName: 'Ruiz' });
    component.invite();

    expect(admin.inviteAdmin).toHaveBeenCalledWith('new@shop.com', 'Sofía', 'Ruiz');
    expect(component.inviteForm.value.email).toBe('');
    expect(admin.getAllUsers).toHaveBeenCalledTimes(2);
  });

  it('does not send an invalid email', () => {
    component.inviteForm.setValue({ email: 'not-an-email', firstName: '', lastName: '' });
    component.invite();
    expect(admin.inviteAdmin).not.toHaveBeenCalled();
  });

  it('promotes and revokes only after confirming', () => {
    spyOn(window, 'confirm').and.returnValues(false, true, false, true);

    component.promote(customer);
    expect(admin.inviteAdmin).not.toHaveBeenCalled();
    component.promote(customer);
    expect(admin.inviteAdmin).toHaveBeenCalledWith('leo@shop.com', '', '');

    component.revoke(otherAdmin);
    expect(admin.revokeAdmin).not.toHaveBeenCalled();
    component.revoke(otherAdmin);
    expect(admin.revokeAdmin).toHaveBeenCalledWith(2);
  });

  it('keeps the form when the server refuses, and re-enables the buttons', () => {
    admin.inviteAdmin.and.returnValue(throwError(() => ({ error: { message: 'Esta cuenta ya es admin' } })));
    component.inviteForm.setValue({ email: 'ana@shop.com', firstName: '', lastName: '' });
    component.invite();

    expect(component.inviteForm.value.email).toBe('ana@shop.com');
    expect(component.saving).toBeFalse();
  });
});
