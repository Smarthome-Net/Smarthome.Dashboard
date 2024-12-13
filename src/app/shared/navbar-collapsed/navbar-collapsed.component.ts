import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavMenu } from '@models';

@Component({
  selector: 'app-navbar-collapsed',
  templateUrl: './navbar-collapsed.component.html',
  styleUrls: ['./navbar-collapsed.component.scss'],
  standalone: false
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
