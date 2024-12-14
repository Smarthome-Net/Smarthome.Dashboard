import { Component, viewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavMenu } from '@models';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavbarComponent } from '@shared/navbar';
import { NavbarCollapsedComponent } from '@shared/navbar-collapsed';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [MatToolbar, 
      MatIconButton, 
      MatIcon, 
      MatSidenavContainer, 
      MatSidenav, 
      NavbarComponent, 
      NavbarCollapsedComponent, 
      MatSidenavContent, 
      RouterOutlet
    ]
})
export class DashboardComponent {
  readonly trigger = viewChild(MatMenuTrigger);
  
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
