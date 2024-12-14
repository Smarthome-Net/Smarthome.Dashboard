import { Component, Input } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-connection-status',
    templateUrl: './connection-status.component.html',
    styleUrls: ['./connection-status.component.scss'],
    imports: [MatIcon]
})
export class ConnectionStatusComponent {

  @Input()
  connectionStatus = 0;

  @Input()
  icons = { on: '', off: '' }
}
