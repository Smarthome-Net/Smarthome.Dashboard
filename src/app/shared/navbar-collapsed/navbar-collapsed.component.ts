import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { NavMenu } from '@models';
import { MatNavList, MatListItem, MatActionList } from '@angular/material/list';

import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-navbar-collapsed',
    templateUrl: './navbar-collapsed.component.html',
    styleUrls: ['./navbar-collapsed.component.scss'],
    imports: [MatNavList, MatListItem, MatTooltip, RouterLink, RouterLinkActive, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, MatActionList]
})
export class NavbarCollapsedComponent {
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;

  @Input() navMenu: NavMenu[] = [];

  @Output() onCollapse: EventEmitter<boolean> = new EventEmitter();

  canMenuOpen(index: number) {
    if (this.navMenu[index].children) {
      this.trigger?.openMenu();
    }
  }
}
