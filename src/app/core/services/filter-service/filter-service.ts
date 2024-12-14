import { Observable, } from "rxjs";
import { Scope } from "@models";

export const ALL: string = 'all';

export abstract class FilterService {
    abstract scopeFilter(): Observable<Scope>;
    abstract updateScope(value: string): void;
    abstract destroy(): void;
}