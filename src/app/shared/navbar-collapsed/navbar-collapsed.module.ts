import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCollapsedComponent } from './navbar-collapsed.component';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    NavbarCollapsedComponent
  ],
  exports: [
    NavbarCollapsedComponent
  ]
})
export class NavbarCollapsedModule { }
