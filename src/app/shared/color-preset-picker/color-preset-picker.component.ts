import { NgTemplateOutlet } from '@angular/common';
import { Component, forwardRef, OnInit, signal } from '@angular/core';
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
  private readonly themesList: ThemePreview[] = [
    { description: 'Grün & Pink', theme: 'lime-pink' },
    { description: 'Blau & Orange', theme: 'blue-orange' }
  ]

  themes = signal<ThemePreview[]>([
    { description: 'Grün & Pink', theme: 'lime-pink' },
    { description: 'Blau & Orange', theme: 'blue-orange' }
  ]);

  selectedTheme = signal<ThemePreview>(this.themesList[0]);

  controlValueAccessorChangeFn?: (theme: Theme) => { };
  controlValueAccessorOnTouchedFn?: (theme: Theme) => { };

  constructor() { }
  
  writeValue(obj: any): void {
    var theme = obj as Theme;

    var themePreview = this.themes().find(t => t.theme === theme);
    if(!themePreview) {
      return;
    }

    this.selectedTheme.set(themePreview);
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
    this.selectedTheme.set(theme);
    this.controlValueAccessorChangeFn!(theme.theme);
    this.controlValueAccessorOnTouchedFn!(theme.theme);
  }

}
