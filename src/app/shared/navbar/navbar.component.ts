import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavMenu } from '@models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() navMenu: NavMenu[] = [];

  @Output() onCollapse: EventEmitter<boolean> = new EventEmitter();
}
