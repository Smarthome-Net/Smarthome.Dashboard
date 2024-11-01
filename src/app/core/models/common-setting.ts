import { ColorScheme } from "./color-scheme";
import { Setting } from "./setting";

export interface CommonSetting extends Setting {
    title: string;
    colorScheme: ColorScheme;
    pageLength: number;
}


