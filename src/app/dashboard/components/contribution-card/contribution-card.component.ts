import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contribution-card',
  templateUrl: './contribution-card.component.html',
  styleUrls: ['./contribution-card.component.css']
})
export class ContributionCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() percentage?: string = '';
  @Input() showPercentage: boolean = false;
}
