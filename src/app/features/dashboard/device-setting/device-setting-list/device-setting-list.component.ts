import { Component, OnInit, inject, signal } from '@angular/core';
import { Device } from '@models';
import { DeviceService, provideDeviceService } from '@services/device-service';
import { DashboardViewBarComponent, DashboardViewTitleDirective } from '@shared';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTable,
  MatColumnDef, 
  MatHeaderCellDef, 
  MatHeaderCell, 
  MatCellDef, 
  MatCell, 
  MatHeaderRowDef, 
  MatHeaderRow, 
  MatRowDef, 
  MatRow } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-device-setting-list',
    templateUrl: './device-setting-list.component.html',
    styleUrls: ['./device-setting-list.component.scss'],
    imports: [DashboardViewBarComponent, 
      DashboardViewTitleDirective, 
      MatCard, 
      MatCardContent, 
      MatTable, 
      MatColumnDef, 
      MatHeaderCellDef, 
      MatHeaderCell, 
      MatCellDef, 
      MatCell, 
      MatTooltip, 
      MatIconAnchor, 
      RouterLink, 
      MatIcon, 
      MatHeaderRowDef, 
      MatHeaderRow, 
      MatRowDef, 
      MatRow
    ],
    providers: [
      provideDeviceService()
    ]
})
export class DeviceSettingListComponent implements OnInit {
  private deviceService = inject(DeviceService);

  displayedColumns = signal<string[]>(['name', 'location', 'topic', 'details']);
  
  devices = signal<Device[]>([]);

  constructor() { }

  ngOnInit() {
    this.deviceService.getAllDevices().subscribe(response => {
      this.devices.set(response);
    })
  }

}
