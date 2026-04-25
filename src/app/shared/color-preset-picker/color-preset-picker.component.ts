import { NgTemplateOutlet } from '@angular/common';
import { Component, forwardRef, model, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem, MatMenuContent, } from '@angular/material/menu';

export type Theme = 'lime-pink' | 'blue-orange'

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
export class ColorPresetPickerComponent implements FormValueControl<Theme> {
  private readonly themesList: ThemePreview[] = [
    { description: 'Grün & Pink', theme: 'lime-pink' },
    { description: 'Blau & Orange', theme: 'blue-orange' }
  ]

  themes = signal<ThemePreview[]>(this.themesList);

  selectedTheme = signal<ThemePreview>(this.themesList[0]);
  value = model<Theme>(this.selectedTheme().theme);

  onThemeSelected(theme: ThemePreview) {
    this.selectedTheme.set(theme);
    this.value.set(theme.theme);
  }

}
