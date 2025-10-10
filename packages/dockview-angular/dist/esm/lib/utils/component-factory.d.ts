import { Type, Injector, EnvironmentInjector } from '@angular/core';
import { IContentRenderer, ITabRenderer, IWatermarkRenderer, IHeaderActionsRenderer, CreateComponentOptions, GridviewPanel, SplitviewPanel, IPanePart } from 'dockview-core';
export declare class AngularFrameworkComponentFactory {
    private components;
    private injector;
    private environmentInjector?;
    private tabComponents?;
    private watermarkComponent?;
    private headerActionsComponents?;
    private defaultTabComponent?;
    constructor(components: Record<string, Type<any>>, injector: Injector, environmentInjector?: EnvironmentInjector | undefined, tabComponents?: Record<string, Type<any>> | undefined, watermarkComponent?: Type<any> | undefined, headerActionsComponents?: Record<string, Type<any>> | undefined, defaultTabComponent?: Type<any> | undefined);
    createDockviewComponent(options: CreateComponentOptions): IContentRenderer;
    createGridviewComponent(options: CreateComponentOptions): GridviewPanel;
    createSplitviewComponent(options: CreateComponentOptions): SplitviewPanel;
    createPaneviewComponent(options: CreateComponentOptions): IPanePart;
    createComponent(options: CreateComponentOptions): IContentRenderer;
    createTabComponent(options: CreateComponentOptions): ITabRenderer | undefined;
    createWatermarkComponent(): IWatermarkRenderer;
    createHeaderActionsComponent(name: string): IHeaderActionsRenderer | undefined;
}
