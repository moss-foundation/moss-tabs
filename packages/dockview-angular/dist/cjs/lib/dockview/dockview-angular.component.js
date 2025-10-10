"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockviewAngularComponent = void 0;
const core_1 = require("@angular/core");
const dockview_core_1 = require("dockview-core");
const component_factory_1 = require("../utils/component-factory");
const lifecycle_utils_1 = require("../utils/lifecycle-utils");
let DockviewAngularComponent = class DockviewAngularComponent {
    constructor() {
        this.ready = new core_1.EventEmitter();
        this.didDrop = new core_1.EventEmitter();
        this.willDrop = new core_1.EventEmitter();
        this.lifecycleManager = new lifecycle_utils_1.AngularLifecycleManager();
        this.injector = (0, core_1.inject)(core_1.Injector);
        this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
    }
    ngOnInit() {
        this.initializeDockview();
    }
    ngOnDestroy() {
        this.lifecycleManager.destroy();
        if (this.dockviewApi) {
            this.dockviewApi.dispose();
        }
    }
    ngOnChanges(changes) {
        if (this.dockviewApi) {
            const coreChanges = {};
            let hasChanges = false;
            // Check for changes in core dockview properties
            dockview_core_1.PROPERTY_KEYS_DOCKVIEW.forEach(key => {
                if (changes[key] && !changes[key].isFirstChange()) {
                    coreChanges[key] = changes[key].currentValue;
                    hasChanges = true;
                }
            });
            if (hasChanges) {
                this.dockviewApi.updateOptions(coreChanges);
            }
        }
    }
    getDockviewApi() {
        return this.dockviewApi;
    }
    initializeDockview() {
        if (!this.components) {
            throw new Error('DockviewAngularComponent: components input is required');
        }
        const coreOptions = this.extractCoreOptions();
        const frameworkOptions = this.createFrameworkOptions();
        this.dockviewApi = (0, dockview_core_1.createDockview)(this.containerRef.nativeElement, {
            ...coreOptions,
            ...frameworkOptions
        });
        // Set up event listeners
        this.setupEventListeners();
        // Emit ready event
        this.ready.emit({ api: this.dockviewApi });
    }
    extractCoreOptions() {
        const coreOptions = {};
        dockview_core_1.PROPERTY_KEYS_DOCKVIEW.forEach(key => {
            const value = this[key];
            if (value !== undefined) {
                coreOptions[key] = value;
            }
        });
        return coreOptions;
    }
    createFrameworkOptions() {
        const headerActionsComponents = {};
        if (this.leftHeaderActionsComponent) {
            headerActionsComponents['left'] = this.leftHeaderActionsComponent;
        }
        if (this.rightHeaderActionsComponent) {
            headerActionsComponents['right'] = this.rightHeaderActionsComponent;
        }
        if (this.prefixHeaderActionsComponent) {
            headerActionsComponents['prefix'] = this.prefixHeaderActionsComponent;
        }
        const componentFactory = new component_factory_1.AngularFrameworkComponentFactory(this.components, this.injector, this.environmentInjector, this.tabComponents, this.watermarkComponent, headerActionsComponents, this.defaultTabComponent);
        return {
            createComponent: (options) => {
                return componentFactory.createDockviewComponent(options);
            },
            createTabComponent: (options) => {
                return componentFactory.createTabComponent(options);
            },
            createWatermarkComponent: this.watermarkComponent
                ? () => {
                    return componentFactory.createWatermarkComponent();
                }
                : undefined,
            createLeftHeaderActionComponent: this.leftHeaderActionsComponent
                ? (group) => {
                    return componentFactory.createHeaderActionsComponent('left');
                }
                : undefined,
            createRightHeaderActionComponent: this.rightHeaderActionsComponent
                ? (group) => {
                    return componentFactory.createHeaderActionsComponent('right');
                }
                : undefined,
            createPrefixHeaderActionComponent: this.prefixHeaderActionsComponent
                ? (group) => {
                    return componentFactory.createHeaderActionsComponent('prefix');
                }
                : undefined
        };
    }
    setupEventListeners() {
        if (!this.dockviewApi) {
            return;
        }
        // Set up event subscriptions using lifecycle manager
        const api = this.dockviewApi;
        if (this.didDrop.observers.length > 0) {
            const disposable = api.onDidDrop(event => {
                this.didDrop.emit(event);
            });
            this.lifecycleManager.addDisposable(disposable);
        }
        if (this.willDrop.observers.length > 0) {
            const disposable = api.onWillDrop(event => {
                this.willDrop.emit(event);
            });
            this.lifecycleManager.addDisposable(disposable);
        }
    }
};
exports.DockviewAngularComponent = DockviewAngularComponent;
__decorate([
    (0, core_1.ViewChild)('dockviewContainer', { static: true }),
    __metadata("design:type", core_1.ElementRef)
], DockviewAngularComponent.prototype, "containerRef", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], DockviewAngularComponent.prototype, "components", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], DockviewAngularComponent.prototype, "tabComponents", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", core_1.Type)
], DockviewAngularComponent.prototype, "watermarkComponent", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", core_1.Type)
], DockviewAngularComponent.prototype, "defaultTabComponent", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", core_1.Type)
], DockviewAngularComponent.prototype, "leftHeaderActionsComponent", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", core_1.Type)
], DockviewAngularComponent.prototype, "rightHeaderActionsComponent", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", core_1.Type)
], DockviewAngularComponent.prototype, "prefixHeaderActionsComponent", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DockviewAngularComponent.prototype, "className", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DockviewAngularComponent.prototype, "orientation", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], DockviewAngularComponent.prototype, "hideBorders", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DockviewAngularComponent.prototype, "rootOverlayModel", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DockviewAngularComponent.prototype, "defaultTabComponent_", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Number)
], DockviewAngularComponent.prototype, "tabHeight", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], DockviewAngularComponent.prototype, "disableFloatingGroups", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DockviewAngularComponent.prototype, "floatingGroupBounds", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DockviewAngularComponent.prototype, "popoutUrl", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], DockviewAngularComponent.prototype, "debug", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], DockviewAngularComponent.prototype, "locked", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], DockviewAngularComponent.prototype, "disableAutoResizing", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DockviewAngularComponent.prototype, "singleTabMode", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], DockviewAngularComponent.prototype, "ready", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], DockviewAngularComponent.prototype, "didDrop", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], DockviewAngularComponent.prototype, "willDrop", void 0);
exports.DockviewAngularComponent = DockviewAngularComponent = __decorate([
    (0, core_1.Component)({
        selector: 'dv-dockview',
        template: '<div #dockviewContainer class="dockview-container"></div>',
        styles: [`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        
        .dockview-container {
            width: 100%;
            height: 100%;
        }
    `],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], DockviewAngularComponent);
