import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'navega-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  get buttonClasses(): string[] {
    const classes = ['navega-button'];

    classes.push(`navega-button--${this.variant}`);
    classes.push(`navega-button--${this.size}`);

    if (this.disabled) {
      classes.push('navega-button--disabled');
    }

    if (this.loading) {
      classes.push('navega-button--loading');
    }

    if (this.fullWidth) {
      classes.push('navega-button--full-width');
    }

    return classes;
  }
}
