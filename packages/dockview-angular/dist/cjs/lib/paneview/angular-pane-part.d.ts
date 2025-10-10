import { Type, Injector, EnvironmentInjector } from '@angular/core';
import { IPanePart, PanelUpdateEvent, PanePanelComponentInitParameter } from 'dockview-core';
export declare class AngularPanePart implements IPanePart {
    private readonly angularComponent;
    private readonly injector;
    private readonly environmentInjector?;
    private renderer;
    constructor(angularComponent: Type<any>, injector: Injector, environmentInjector?: EnvironmentInjector | undefined);
    get element(): HTMLElement;
    init(parameters: PanePanelComponentInitParameter): void;
    update(params: PanelUpdateEvent): void;
    dispose(): void;
}
