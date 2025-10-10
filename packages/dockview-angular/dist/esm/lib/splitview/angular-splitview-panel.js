import { SplitviewPanel, } from 'dockview-core';
import { AngularRenderer } from '../utils/angular-renderer';
export class AngularSplitviewPanel extends SplitviewPanel {
    constructor(id, component, angularComponent, injector, environmentInjector) {
        super(id, component);
        this.angularComponent = angularComponent;
        this.injector = injector;
        this.environmentInjector = environmentInjector;
    }
    getComponent() {
        return new AngularRenderer({
            component: this.angularComponent,
            injector: this.injector,
            environmentInjector: this.environmentInjector
        });
    }
}
