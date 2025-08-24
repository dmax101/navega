import { Component, Input } from '@angular/core';

@Component({
  selector: 'navega-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.less']
})
export class LabelComponent {
  @Input() text: string = '';
}
