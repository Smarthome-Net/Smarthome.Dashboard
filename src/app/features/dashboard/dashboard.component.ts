import { Component, inject, signal, viewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavMenu } from '@models';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavbarComponent, NavbarCollapsedComponent } from '@shared';
import { RouterOutlet } from '@angular/router';
import { AppSettingService } from '@services/app-setting-service';

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
  private appSettingService = inject(AppSettingService);

  isCollapsed = true;
  dashboardTitle = signal<string>('Dashboard');

  navMenu: NavMenu[] = [
    { link: 'home', displayText: 'Home', icon: 'home' },
    {
      link: 'temperature', displayText: 'Temperatur', icon: 'thermostat', children: [
        { link: 'temperature/values', displayText: 'Werte', icon: 'show_chart' },
        { link: 'temperature/statistics', displayText: 'Statistik', icon: 'bar_chart' },
      ]
    },
    { link: 'device-setting', displayText: 'Geräteeinstellung', icon: 'devices' },
    { link: 'setting', displayText: 'Einstellungen', icon: 'settings' }
  ]

  constructor() {
    this.appSettingService.$commonSetting.subscribe(commonSetting => {
      this.dashboardTitle.set(commonSetting.title);
    });
  }

  onCollapse(value: boolean) {
    this.isCollapsed = value;
  }
}
