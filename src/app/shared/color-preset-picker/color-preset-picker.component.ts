import { NgTemplateOutlet } from '@angular/common';
import { Component, forwardRef, OnInit, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPresetPickerComponent),
      multi: true
    }
  ]
})
export class ColorPresetPickerComponent implements OnInit, ControlValueAccessor {
  themes: ThemePreview[] = [
    { description: 'Grün & Pink', theme: 'lime-pink' },
    { description: 'Blau & Orange', theme: 'blue-orange' }
  ]

  selectedTheme: ThemePreview = this.themes[0];

  controlValueAccessorChangeFn?: (theme: Theme) => { };
  controlValueAccessorOnTouchedFn?: (theme: Theme) => { };

  constructor() { }
  
  writeValue(obj: any): void {
    var theme = obj as Theme;

    var themePreview = this.themes.find(t => t.theme === theme);
    if(!themePreview) {
      return;
    }

    this.selectedTheme = themePreview;
  }

  registerOnChange(fn: any): void {
    this.controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.controlValueAccessorOnTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit() {
  }

  onThemeSelected(theme: ThemePreview) {
    this.selectedTheme = theme;
    this.controlValueAccessorChangeFn!(theme.theme);
    this.controlValueAccessorOnTouchedFn!(theme.theme);
  }

}
