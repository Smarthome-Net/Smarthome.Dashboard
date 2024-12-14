import { Component, input, output, viewChild } from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { NavMenu } from '@models';
import { MatNavList, MatListItem, MatActionList } from '@angular/material/list';

import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { timeout, timer } from 'rxjs';

@Component({
    selector: 'app-navbar-collapsed',
    templateUrl: './navbar-collapsed.component.html',
    styleUrls: ['./navbar-collapsed.component.scss'],
    imports: [MatNavList, MatListItem, MatTooltip, RouterLink, RouterLinkActive, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, MatActionList]
})
export class NavbarCollapsedComponent {
  readonly trigger = viewChild(MatMenuTrigger);
  readonly navMenu = input<NavMenu[]>([]);
  readonly onCollapse = output<boolean>();

  canMenuOpen(index: number) {
    if (this.navMenu()[index].children) {
      this.trigger()?.openMenu();
      timer(5000).subscribe(() => {
        this.trigger()?.closeMenu();
      })
    }
  }
}
