import { Component, OnInit } from '@angular/core';
import { DashboardViewBarComponent, DashboardViewTitleDirective } from '@shared/dashboard-view-bar';

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
