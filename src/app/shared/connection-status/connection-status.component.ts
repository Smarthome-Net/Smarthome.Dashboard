import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-connection-status',
    templateUrl: './connection-status.component.html',
    styleUrls: ['./connection-status.component.scss'],
    imports: [NgIf, MatIcon]
})
export class ConnectionStatusComponent {

  @Input()
  public connectionStatus = 0;

  @Input()
  public icons = { on: '', off: '' }
}
