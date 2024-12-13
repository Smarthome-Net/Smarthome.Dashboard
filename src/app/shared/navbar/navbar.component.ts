import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavMenu } from '@models';
import { MatNavList, MatListItem, MatActionList } from '@angular/material/list';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [MatNavList, NgFor, MatListItem, RouterLink, RouterLinkActive, MatIcon, NgIf, MatMenuTrigger, MatMenu, MatMenuItem, MatActionList]
})
export class NavbarComponent {

  @Input() navMenu: NavMenu[] = [];

  @Output() onCollapse: EventEmitter<boolean> = new EventEmitter();
}
