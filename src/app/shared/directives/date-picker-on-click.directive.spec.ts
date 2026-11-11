import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatePickerOnClickDirective } from './date-picker-on-click.directive';

@Component({
  imports: [DatePickerOnClickDirective],
  template: `<input type="date" id="d"><input type="date" id="off" disabled><input type="text" id="t">`,
})
class HostComponent {}

describe('DatePickerOnClickDirective', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const get = (id: string) => fixture.nativeElement.querySelector('#' + id) as HTMLInputElement & { showPicker: () => void };
    return { get };
  }

  it('opens the calendar when a date field is clicked', () => {
    const { get } = setup();
    const spy = spyOn(get('d'), 'showPicker');
    get('d').click();
    expect(spy).toHaveBeenCalled();
  });

  it('leaves disabled date fields and other inputs alone', () => {
    const { get } = setup();
    const off = spyOn(get('off'), 'showPicker');
    get('off').dispatchEvent(new MouseEvent('click'));
    expect(off).not.toHaveBeenCalled();
    expect(() => get('t').click()).not.toThrow();
  });

  it('does not break when the browser refuses to open it', () => {
    const { get } = setup();
    spyOn(get('d'), 'showPicker').and.throwError('NotAllowedError');
    expect(() => get('d').click()).not.toThrow();
  });
});
