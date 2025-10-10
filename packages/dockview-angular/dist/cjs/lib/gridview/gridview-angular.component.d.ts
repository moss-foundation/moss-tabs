import { EventEmitter, OnDestroy, OnInit, Type, OnChanges, SimpleChanges } from '@angular/core';
import { GridviewApi, GridviewOptions } from 'dockview-core';
import { GridviewAngularReadyEvent } from './types';
export interface GridviewAngularOptions extends GridviewOptions {
    components: Record<string, Type<any>>;
}
export declare class GridviewAngularComponent implements OnInit, OnDestroy, OnChanges {
    private containerRef;
    components: Record<string, Type<any>>;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    proportionalLayout?: boolean;
    hideBorders?: boolean;
    debug?: boolean;
    disableAutoResizing?: boolean;
    ready: EventEmitter<GridviewAngularReadyEvent>;
    private gridviewApi?;
    private lifecycleManager;
    private injector;
    private environmentInjector;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getGridviewApi(): GridviewApi | undefined;
    private initializeGridview;
    private extractCoreOptions;
    private createFrameworkOptions;
}
