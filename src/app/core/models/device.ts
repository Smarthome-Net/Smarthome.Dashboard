import { DeviceConfiguration } from "./device-configuration";

export interface Device {
  id: string;
  name: string;
  room: string;
  topic: string;
  configuration: DeviceConfiguration
}
