import { Injector, Type, EnvironmentInjector } from '@angular/core';
import { IContentRenderer, IFrameworkPart, Parameters } from 'dockview-core';
export interface AngularRendererOptions {
    component: Type<any>;
    injector: Injector;
    environmentInjector?: EnvironmentInjector;
}
export declare class AngularRenderer implements IContentRenderer, IFrameworkPart {
    private options;
    private componentRef;
    private _element;
    constructor(options: AngularRendererOptions);
    get element(): HTMLElement;
    init(parameters: Parameters): void;
    update(params: Parameters): void;
    private render;
    dispose(): void;
}
