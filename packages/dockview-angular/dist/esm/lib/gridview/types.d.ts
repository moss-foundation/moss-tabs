import { Type } from '@angular/core';
import { GridviewOptions, GridviewApi } from 'dockview-core';
export interface GridviewAngularReadyEvent {
    api: GridviewApi;
}
export interface GridviewAngularOptions extends GridviewOptions {
    components: Record<string, Type<any>>;
}
export interface GridviewAngularEvents {
    ready: GridviewAngularReadyEvent;
}
export { GridviewApi, GridviewOptions } from 'dockview-core';
