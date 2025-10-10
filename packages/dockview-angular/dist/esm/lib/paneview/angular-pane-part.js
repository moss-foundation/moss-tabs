import { AngularRenderer } from '../utils/angular-renderer';
export class AngularPanePart {
    constructor(angularComponent, injector, environmentInjector) {
        this.angularComponent = angularComponent;
        this.injector = injector;
        this.environmentInjector = environmentInjector;
        this.renderer = new AngularRenderer({
            component: this.angularComponent,
            injector: this.injector,
            environmentInjector: this.environmentInjector
        });
    }
    get element() {
        return this.renderer.element;
    }
    init(parameters) {
        this.renderer.init(parameters);
    }
    update(params) {
        this.renderer.update(params);
    }
    dispose() {
        this.renderer.dispose();
    }
}
