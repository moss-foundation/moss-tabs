import { EventEmitter, OnDestroy, OnInit, Type, OnChanges, SimpleChanges } from '@angular/core';
import { SplitviewApi, SplitviewOptions } from 'dockview-core';
import { SplitviewAngularReadyEvent } from './types';
export interface SplitviewAngularOptions extends SplitviewOptions {
    components: Record<string, Type<any>>;
}
export declare class SplitviewAngularComponent implements OnInit, OnDestroy, OnChanges {
    private containerRef;
    components: Record<string, Type<any>>;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    proportionalLayout?: boolean;
    hideBorders?: boolean;
    debug?: boolean;
    disableAutoResizing?: boolean;
    ready: EventEmitter<SplitviewAngularReadyEvent>;
    private splitviewApi?;
    private lifecycleManager;
    private injector;
    private environmentInjector;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getSplitviewApi(): SplitviewApi | undefined;
    private initializeSplitview;
    private extractCoreOptions;
    private createFrameworkOptions;
}
