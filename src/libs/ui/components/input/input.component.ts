import { Component, Input, forwardRef, Injector, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'navega-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() formControlName?: string;
  @Input() ngModel?: string | number;
  @Input() customClass: string = '';
  @Input() style: { [key: string]: string } | null = null;
  @Input() styleClass: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  @Input() valid: boolean = false; // indica se o campo está válido

  showPassword: boolean = false;

  control?: NgControl;

  constructor(@Optional() private injector: Injector) {
    if (this.injector) {
      this.control = this.injector.get(NgControl, null) || undefined;
    }
  }

  get isValid(): boolean {
    // Se valid foi passado manualmente, usa ele
    if (this.valid) {
      return true;
    }
    // Senão, verifica se o FormControl é válido
    if (this.control && this.control.control) {
      return this.control.control.valid && this.control.control.touched;
    }
    return false;
  }

  get inputType(): string {
    return this.type === 'password' ? (this.showPassword ? 'text' : 'password') : this.type;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  value: string | number | undefined = '';
  disabled: boolean = false;

  // ControlValueAccessor implementation
  writeValue(value: string | number | undefined): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string | number | undefined) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: (value: string | number | undefined) => void = () => {};
  onTouched: () => void = () => {};

  // Helper to safely extract value from input event
  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.onChange(input ? input.value : '');
  }
}
