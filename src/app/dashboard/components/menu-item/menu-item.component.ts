import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.less']
})
export class MenuItemComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() showChevron: boolean = true;
}
