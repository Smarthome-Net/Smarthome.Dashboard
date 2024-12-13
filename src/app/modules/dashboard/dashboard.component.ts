import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavMenu } from '@models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent {
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  
  isCollapsed = true;

  navMenu: NavMenu[] = [
    { link: 'index', displayText: 'Home', icon: 'home' },
    { link: 'temperature', displayText: 'Temperatur', icon: 'thermostat', children: [
      { link: 'temperature/value', displayText: 'Werte', icon: 'show_chart' },
      { link: 'temperature/statistic', displayText: 'Statistik', icon: 'bar_chart' },
    ]},
    { link: 'device-setting', displayText: 'Geräteeinstellung', icon: 'devices' },
    { link: 'setting', displayText: 'Einstellungen', icon: 'settings'}
  ]

  constructor() { }

  onCollapse(value: boolean) {
    this.isCollapsed = value;
  }
}
