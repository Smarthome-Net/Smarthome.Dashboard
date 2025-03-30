import { Injectable } from '@angular/core';
import { StyleManagerService } from './style-manager-service';
import { Theme } from '@shared';

@Injectable()
export class StyleManagerServiceImpl extends StyleManagerService {
  private currenttheme: Theme = 'lime-pink';

  constructor() {
    super();
   }

  override setTheme(theme: Theme): void {
    var link = document.querySelector(`link[rel="stylesheet"][href*="${this.currenttheme}.css"]`);
    if (link) {
      link.setAttribute('href', `${theme}.css`);
    }
    this.currenttheme = theme;
  }

}
