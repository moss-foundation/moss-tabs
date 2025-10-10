import { EventEmitter, OnDestroy, OnInit, Type, OnChanges, SimpleChanges } from '@angular/core';
import { DockviewApi, DockviewOptions, DockviewReadyEvent, DockviewDidDropEvent, DockviewWillDropEvent } from 'dockview-core';
export interface DockviewAngularOptions extends DockviewOptions {
    components: Record<string, Type<any>>;
    tabComponents?: Record<string, Type<any>>;
    watermarkComponent?: Type<any>;
    defaultTabComponent?: Type<any>;
    leftHeaderActionsComponent?: Type<any>;
    rightHeaderActionsComponent?: Type<any>;
    prefixHeaderActionsComponent?: Type<any>;
}
export declare class DockviewAngularComponent implements OnInit, OnDestroy, OnChanges {
    private containerRef;
    components: Record<string, Type<any>>;
    tabComponents?: Record<string, Type<any>>;
    watermarkComponent?: Type<any>;
    defaultTabComponent?: Type<any>;
    leftHeaderActionsComponent?: Type<any>;
    rightHeaderActionsComponent?: Type<any>;
    prefixHeaderActionsComponent?: Type<any>;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    hideBorders?: boolean;
    rootOverlayModel?: 'always' | 'never';
    defaultTabComponent_?: string;
    tabHeight?: number;
    disableFloatingGroups?: boolean;
    floatingGroupBounds?: 'boundedWithinViewport';
    popoutUrl?: string;
    debug?: boolean;
    locked?: boolean;
    disableAutoResizing?: boolean;
    singleTabMode?: 'fullwidth' | 'default';
    ready: EventEmitter<DockviewReadyEvent>;
    didDrop: EventEmitter<DockviewDidDropEvent>;
    willDrop: EventEmitter<DockviewWillDropEvent>;
    private dockviewApi?;
    private lifecycleManager;
    private injector;
    private environmentInjector;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getDockviewApi(): DockviewApi | undefined;
    private initializeDockview;
    private extractCoreOptions;
    private createFrameworkOptions;
    private setupEventListeners;
}
