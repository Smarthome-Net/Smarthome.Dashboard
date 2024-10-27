import { Setting } from "./setting";

export interface PageSetting extends Setting {
  length: number;
  pageIndex: number;
  pageSize: number;
}
