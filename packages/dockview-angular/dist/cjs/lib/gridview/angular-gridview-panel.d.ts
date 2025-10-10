import { Type, Injector, EnvironmentInjector } from '@angular/core';
import { GridviewPanel, IFrameworkPart } from 'dockview-core';
export declare class AngularGridviewPanel extends GridviewPanel {
    private readonly angularComponent;
    private readonly injector;
    private readonly environmentInjector?;
    constructor(id: string, component: string, angularComponent: Type<any>, injector: Injector, environmentInjector?: EnvironmentInjector | undefined);
    getComponent(): IFrameworkPart;
}
