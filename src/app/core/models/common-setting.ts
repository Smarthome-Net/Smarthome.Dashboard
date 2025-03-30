import { Theme } from "@shared";
import { Setting } from "./setting";

export interface CommonSetting extends Setting {
    title: string;
    theme: Theme;
    pageLength: number;
}

export interface CommonSettingStorage {
    title: string;
    theme: Theme;
    pageLength: number;
}


