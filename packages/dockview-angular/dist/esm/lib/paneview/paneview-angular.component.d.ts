import { EventEmitter, OnDestroy, OnInit, Type, OnChanges, SimpleChanges } from '@angular/core';
import { PaneviewApi, PaneviewOptions, PaneviewDropEvent } from 'dockview-core';
import { PaneviewAngularReadyEvent } from './types';
export interface PaneviewAngularOptions extends PaneviewOptions {
    components: Record<string, Type<any>>;
    headerComponents?: Record<string, Type<any>>;
}
export declare class PaneviewAngularComponent implements OnInit, OnDestroy, OnChanges {
    private containerRef;
    components: Record<string, Type<any>>;
    headerComponents?: Record<string, Type<any>>;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    hideBorders?: boolean;
    debug?: boolean;
    disableAutoResizing?: boolean;
    ready: EventEmitter<PaneviewAngularReadyEvent>;
    drop: EventEmitter<PaneviewDropEvent>;
    private paneviewApi?;
    private lifecycleManager;
    private injector;
    private environmentInjector;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getPaneviewApi(): PaneviewApi | undefined;
    private initializePaneview;
    private extractCoreOptions;
    private createFrameworkOptions;
    private setupEventListeners;
}
