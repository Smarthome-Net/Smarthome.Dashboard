import { Observable, Subject } from "rxjs";
import { Device, Scope } from "@models";

export abstract class FilterService {
    abstract getRoomList(): Observable<Device[]>;
    abstract getDeviceList(room: string): Observable<Device[]>;
    abstract setSelectedRoom(room: string): void;
    abstract setSelectedDevice(device: string): void;
    abstract scopeFilter(): Observable<Scope>;
    abstract destroy(): void;
}