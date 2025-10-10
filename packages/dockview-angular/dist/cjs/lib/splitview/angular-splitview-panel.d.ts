import { Type, Injector, EnvironmentInjector } from '@angular/core';
import { SplitviewPanel, IFrameworkPart } from 'dockview-core';
export declare class AngularSplitviewPanel extends SplitviewPanel {
    private readonly angularComponent;
    private readonly injector;
    private readonly environmentInjector?;
    constructor(id: string, component: string, angularComponent: Type<any>, injector: Injector, environmentInjector?: EnvironmentInjector | undefined);
    getComponent(): IFrameworkPart;
}
