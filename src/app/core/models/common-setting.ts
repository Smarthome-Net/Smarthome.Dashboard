import { Theme } from "@shared";
import { ColorScheme } from "./color-scheme";
import { Setting } from "./setting";

export interface CommonSetting extends Setting {
    title: string;
    theme: Theme;
    pageLength: number;
}


