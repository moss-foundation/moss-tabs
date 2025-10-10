import { Type } from '@angular/core';
import { SplitviewOptions, SplitviewApi } from 'dockview-core';
export interface SplitviewAngularReadyEvent {
    api: SplitviewApi;
}
export interface SplitviewAngularOptions extends SplitviewOptions {
    components: Record<string, Type<any>>;
}
export interface SplitviewAngularEvents {
    ready: SplitviewAngularReadyEvent;
}
export { SplitviewApi, SplitviewOptions } from 'dockview-core';
