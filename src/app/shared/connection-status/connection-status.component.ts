import { Component, input } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-connection-status',
    templateUrl: './connection-status.component.html',
    styleUrls: ['./connection-status.component.scss'],
    imports: [MatIcon]
})
export class ConnectionStatusComponent {

  readonly connectionStatus = input(0);

  readonly icons = input({ on: '', off: '' });
}
