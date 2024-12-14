import { Component, input, output } from '@angular/core';
import { NavMenu } from '@models';
import { MatNavList, MatListItem, MatActionList } from '@angular/material/list';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [MatNavList, MatListItem, RouterLink, RouterLinkActive, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, MatActionList]
})
export class NavbarComponent {

  readonly navMenu = input<NavMenu[]>([]);

  readonly onCollapse = output<boolean>();
}
