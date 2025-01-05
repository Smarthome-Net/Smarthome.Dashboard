import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem, MatMenuContent, } from '@angular/material/menu';

type Theme = 'lime-pink' | 'blue-orange'

type ThemePreview = {
  description: string,
  theme: Theme,
}

@Component({
  selector: 'app-color-preset-picker',
  templateUrl: './color-preset-picker.component.html',
  styleUrls: ['./color-preset-picker.component.scss'],
  imports: [
    MatIcon,
    MatIconButton,
    MatMenuTrigger, 
    MatMenu, 
    MatMenuItem,
    MatMenuContent,
    NgTemplateOutlet,
  ]
})
export class ColorPresetPickerComponent implements OnInit {
  themes: ThemePreview[] = [
    { description: 'Grün & Pink', theme: 'lime-pink' },
    { description: 'Blau & Orange', theme: 'blue-orange' }
  ]

  selectedTheme: ThemePreview = this.themes[0];

  constructor() { }

  ngOnInit() {
  }

  onThemeSelected(theme: ThemePreview) {
    this.selectedTheme = theme;
  }

}
