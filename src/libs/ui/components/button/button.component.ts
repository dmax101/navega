import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'navega-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonComponent),
      multi: true
    }
  ]
})
export class ButtonComponent implements ControlValueAccessor {
  @Input() type: 'Common' | 'Other' | 'submit' = 'Common';
  @Input() hierarchy: 'Primary' | 'Secondary' = 'Primary';
  @Input() state: 'Default' | 'Disabled' = 'Default';
  @Input() label: string = 'Button';
  @Input() showIconLeft: boolean = false;
  @Input() showIconRight: boolean = false;
  @Input() disabled: boolean = false;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    // No value to write for a button
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
