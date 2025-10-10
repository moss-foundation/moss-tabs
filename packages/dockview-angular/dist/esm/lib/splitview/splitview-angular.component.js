var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Injector, Input, Output, ViewChild, ChangeDetectionStrategy, EnvironmentInjector, inject } from '@angular/core';
import { createSplitview, PROPERTY_KEYS_SPLITVIEW } from 'dockview-core';
import { AngularFrameworkComponentFactory } from '../utils/component-factory';
import { AngularLifecycleManager } from '../utils/lifecycle-utils';
let SplitviewAngularComponent = class SplitviewAngularComponent {
    constructor() {
        this.ready = new EventEmitter();
        this.lifecycleManager = new AngularLifecycleManager();
        this.injector = inject(Injector);
        this.environmentInjector = inject(EnvironmentInjector);
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
            PROPERTY_KEYS_SPLITVIEW.forEach(key => {
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
        this.splitviewApi = createSplitview(this.containerRef.nativeElement, {
            ...coreOptions,
            ...frameworkOptions
        });
        // Emit ready event
        this.ready.emit({ api: this.splitviewApi });
    }
    extractCoreOptions() {
        const coreOptions = {};
        PROPERTY_KEYS_SPLITVIEW.forEach(key => {
            const value = this[key];
            if (value !== undefined) {
                coreOptions[key] = value;
            }
        });
        return coreOptions;
    }
    createFrameworkOptions() {
        const componentFactory = new AngularFrameworkComponentFactory(this.components, this.injector, this.environmentInjector);
        return {
            createComponent: (options) => {
                return componentFactory.createSplitviewComponent(options);
            }
        };
    }
};
__decorate([
    ViewChild('splitviewContainer', { static: true }),
    __metadata("design:type", ElementRef)
], SplitviewAngularComponent.prototype, "containerRef", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SplitviewAngularComponent.prototype, "components", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SplitviewAngularComponent.prototype, "className", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SplitviewAngularComponent.prototype, "orientation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "proportionalLayout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "hideBorders", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "debug", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SplitviewAngularComponent.prototype, "disableAutoResizing", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SplitviewAngularComponent.prototype, "ready", void 0);
SplitviewAngularComponent = __decorate([
    Component({
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
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SplitviewAngularComponent);
export { SplitviewAngularComponent };
