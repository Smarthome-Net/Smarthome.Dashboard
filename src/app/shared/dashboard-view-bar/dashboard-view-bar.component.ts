import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-view-bar',
  templateUrl: './dashboard-view-bar.component.html',
  styleUrls: ['./dashboard-view-bar.component.scss']
})
export class DashboardViewBarComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
