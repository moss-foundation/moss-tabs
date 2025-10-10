"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularGridviewPanel = void 0;
const dockview_core_1 = require("dockview-core");
const angular_renderer_1 = require("../utils/angular-renderer");
class AngularGridviewPanel extends dockview_core_1.GridviewPanel {
    constructor(id, component, angularComponent, injector, environmentInjector) {
        super(id, component);
        this.angularComponent = angularComponent;
        this.injector = injector;
        this.environmentInjector = environmentInjector;
    }
    getComponent() {
        return new angular_renderer_1.AngularRenderer({
            component: this.angularComponent,
            injector: this.injector,
            environmentInjector: this.environmentInjector
        });
    }
}
exports.AngularGridviewPanel = AngularGridviewPanel;
