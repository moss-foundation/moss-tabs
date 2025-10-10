"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularPanePart = void 0;
const angular_renderer_1 = require("../utils/angular-renderer");
class AngularPanePart {
    constructor(angularComponent, injector, environmentInjector) {
        this.angularComponent = angularComponent;
        this.injector = injector;
        this.environmentInjector = environmentInjector;
        this.renderer = new angular_renderer_1.AngularRenderer({
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
exports.AngularPanePart = AngularPanePart;
