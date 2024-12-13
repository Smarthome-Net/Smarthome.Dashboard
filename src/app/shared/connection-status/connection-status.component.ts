import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.scss'],
  standalone: false
})
export class ConnectionStatusComponent {

  @Input()
  public connectionStatus = 0;

  @Input()
  public icons = { on: '', off: '' }
}
