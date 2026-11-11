import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Opens the browser's calendar when a date field is clicked anywhere, not only on its small icon.
 * Applies to every <input type="date"> of the components that import it. Typing still works.
 */
@Directive({ selector: 'input[type="date"]' })
export class DatePickerOnClickDirective {
  private readonly input = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  @HostListener('click')
  open(): void {
    const el = this.input as HTMLInputElement & { showPicker?: () => void };
    if (el.disabled || el.readOnly || typeof el.showPicker !== 'function') return;
    try {
      el.showPicker();
    } catch {
      // some browsers refuse it (e.g. inside a cross-origin frame); the field still works by typing
    }
  }
}
