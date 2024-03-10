import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionStatusComponent } from './connection-status.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,

    MatIconModule
  ],
  declarations: [
    ConnectionStatusComponent
  ],
  exports: [
    ConnectionStatusComponent,
  ]
})
export class ConnectionStatusModule { }
