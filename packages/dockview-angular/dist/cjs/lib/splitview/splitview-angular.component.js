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
exports.SplitviewAngularComponent = void 0;
const core_1 = require("@angular/core");
const dockview_core_1 = require("dockview-core");
const component_factory_1 = require("../utils/component-factory");
const lifecycle_utils_1 = require("../utils/lifecycle-utils");
let SplitviewAngularComponent = class SplitviewAngularComponent {
    constructor() {
        this.ready = new core_1.EventEmitter();
        this.lifecycleManager = new lifecycle_utils_1.AngularLifecycleManager();
        this.injector = (0, core_1.inject)(core_1.Injector);
        this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
    }
    ngOnInit() {
        this.initializeSplitview();
    }
    ngOnDestroy() {
        this.lifecycleManager.destroy();
        if (this.splitviewApi) {
            this.splitviewApi.dispose();
        }
    }
    ngOnChanges(changes) {
        if (this.splitviewApi) {
            const coreChanges = {};
            let hasChanges = false;
            // Check for changes in core splitview properties
            dockview_core_1.PROPERTY_KEYS_SPLITVIEW.forEach(key => {
                if (changes[key] && !changes[key].isFirstChange()) {
                    coreChanges[key] = changes[key].currentValue;
                    hasChanges = true;
                }
            });
            if (hasChanges) {
                this.splitviewApi.updateOptions(coreChanges);
            }
        }
    }
    getSplitviewApi() {
        return this.splitviewApi;
    }
    initializeSplitview() {
        if (!this.components) {
            throw new Error('SplitviewAngularComponent: components input is required');
        }
        const coreOptions = this.extractCoreOptions();
        const frameworkOptions = this.createFrameworkOptions();
        this.splitviewApi = (0, dockview_core_1.createSplitview)(this.containerRef.nativeElement, {
            ...coreOptions,
            ...frameworkOptions
        });
        // Emit ready event
        this.ready.emit({ api: this.splitviewApi });
    }
    extractCoreOptions() {
        const coreOptions = {};
        dockview_core_1.PROPERTY_KEYS_SPLITVIEW.forEach(key => {
            const value = this[key];
            if (value !== undefined) {
                coreOptions[key] = value;
            }
        });
        return coreOptions;
    }
    createFrameworkOptions() {
        const componentFactory = new component_factory_1.AngularFrameworkComponentFactory(this.components, this.injector, this.environmentInjector);
        return {
            createComponent: (options) => {
                return componentFactory.createSplitviewComponent(options);
            }
        };
    }
};
exports.SplitviewAngularComponent = SplitviewAngularComponent;
__decorate([
    (0, core_1.ViewChild)('splitviewContainer', { static: true }),
    __metadata("design:type", core_1.ElementRef)
], SplitviewAngularComponent.prototype, "containerRef", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], SplitviewAngularComponent.prototype, "components", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], SplitviewAngularComponent.prototype, "className", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], SplitviewAngularComponent.prototype, "orientation", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "proportionalLayout", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "hideBorders", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "debug", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "disableAutoResizing", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], SplitviewAngularComponent.prototype, "ready", void 0);
exports.SplitviewAngularComponent = SplitviewAngularComponent = __decorate([
    (0, core_1.Component)({
        selector: 'dv-splitview',
        template: '<div #splitviewContainer class="splitview-container"></div>',
        styles: [`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        
        .splitview-container {
            width: 100%;
            height: 100%;
        }
    `],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], SplitviewAngularComponent);
