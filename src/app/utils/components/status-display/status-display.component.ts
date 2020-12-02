import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-display',
  templateUrl: './status-display.html'
})
export class StatusDisplayComponent {
  @Input() public status;

  constructor() { }
}
