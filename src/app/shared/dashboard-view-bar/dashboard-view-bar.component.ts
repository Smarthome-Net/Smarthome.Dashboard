import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-dashboard-view-bar',
    templateUrl: './dashboard-view-bar.component.html',
    styleUrls: ['./dashboard-view-bar.component.scss'],
    imports: [MatIconButton, MatTooltip, MatIcon, MatDivider]
})
export class DashboardViewBarComponent implements OnInit {
  private location = inject(Location);

  constructor() { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
