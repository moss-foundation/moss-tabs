"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularSplitviewPanel = void 0;
const dockview_core_1 = require("dockview-core");
const angular_renderer_1 = require("../utils/angular-renderer");
class AngularSplitviewPanel extends dockview_core_1.SplitviewPanel {
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
exports.AngularSplitviewPanel = AngularSplitviewPanel;
