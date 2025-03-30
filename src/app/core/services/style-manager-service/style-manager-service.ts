import { Theme } from "@shared";

export abstract class StyleManagerService { 
    abstract setTheme(theme: Theme): void;
}