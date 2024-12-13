import { Component, OnInit } from '@angular/core';
import { DashboardViewBarComponent } from '../../../shared/dashboard-view-bar/dashboard-view-bar.component';
import { DashboardViewTitleDirective } from '../../../shared/dashboard-view-bar/dashboard-view-title.directive';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [DashboardViewBarComponent, DashboardViewTitleDirective]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
