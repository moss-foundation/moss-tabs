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
import { createPaneview, PROPERTY_KEYS_PANEVIEW } from 'dockview-core';
import { AngularFrameworkComponentFactory } from '../utils/component-factory';
import { AngularLifecycleManager } from '../utils/lifecycle-utils';
import { AngularPanePart } from './angular-pane-part';
let PaneviewAngularComponent = class PaneviewAngularComponent {
    constructor() {
        this.ready = new EventEmitter();
        this.drop = new EventEmitter();
        this.lifecycleManager = new AngularLifecycleManager();
        this.injector = inject(Injector);
        this.environmentInjector = inject(EnvironmentInjector);
    }
    ngOnInit() {
        this.initializePaneview();
    }
    ngOnDestroy() {
        this.lifecycleManager.destroy();
        if (this.paneviewApi) {
            this.paneviewApi.dispose();
        }
    }
    ngOnChanges(changes) {
        if (this.paneviewApi) {
            const coreChanges = {};
            let hasChanges = false;
            // Check for changes in core paneview properties
            PROPERTY_KEYS_PANEVIEW.forEach(key => {
                if (changes[key] && !changes[key].isFirstChange()) {
                    coreChanges[key] = changes[key].currentValue;
                    hasChanges = true;
                }
            });
            if (hasChanges) {
                this.paneviewApi.updateOptions(coreChanges);
            }
        }
    }
    getPaneviewApi() {
        return this.paneviewApi;
    }
    initializePaneview() {
        if (!this.components) {
            throw new Error('PaneviewAngularComponent: components input is required');
        }
        const coreOptions = this.extractCoreOptions();
        const frameworkOptions = this.createFrameworkOptions();
        this.paneviewApi = createPaneview(this.containerRef.nativeElement, {
            ...coreOptions,
            ...frameworkOptions
        });
        // Set up event listeners
        this.setupEventListeners();
        // Emit ready event
        this.ready.emit({ api: this.paneviewApi });
    }
    extractCoreOptions() {
        const coreOptions = {};
        PROPERTY_KEYS_PANEVIEW.forEach(key => {
            const value = this[key];
            if (value !== undefined) {
                coreOptions[key] = value;
            }
        });
        return coreOptions;
    }
    createFrameworkOptions() {
        const componentFactory = new AngularFrameworkComponentFactory(this.components, this.injector, this.environmentInjector, this.headerComponents);
        return {
            createComponent: (options) => {
                return componentFactory.createPaneviewComponent(options);
            },
            createHeaderComponent: this.headerComponents
                ? (options) => {
                    return new AngularPanePart(this.headerComponents[options.name], this.injector, this.environmentInjector);
                }
                : undefined
        };
    }
    setupEventListeners() {
        if (!this.paneviewApi) {
            return;
        }
        // Set up event subscriptions using lifecycle manager
        const api = this.paneviewApi;
        if (this.drop.observers.length > 0) {
            const disposable = api.onDidDrop(event => {
                this.drop.emit(event);
            });
            this.lifecycleManager.addDisposable(disposable);
        }
    }
};
__decorate([
    ViewChild('paneviewContainer', { static: true }),
    __metadata("design:type", ElementRef)
], PaneviewAngularComponent.prototype, "containerRef", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PaneviewAngularComponent.prototype, "components", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PaneviewAngularComponent.prototype, "headerComponents", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PaneviewAngularComponent.prototype, "className", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PaneviewAngularComponent.prototype, "orientation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PaneviewAngularComponent.prototype, "hideBorders", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PaneviewAngularComponent.prototype, "debug", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PaneviewAngularComponent.prototype, "disableAutoResizing", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PaneviewAngularComponent.prototype, "ready", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PaneviewAngularComponent.prototype, "drop", void 0);
PaneviewAngularComponent = __decorate([
    Component({
        selector: 'dv-paneview',
        template: '<div #paneviewContainer class="paneview-container"></div>',
        styles: [`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        
        .paneview-container {
            width: 100%;
            height: 100%;
        }
    `],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PaneviewAngularComponent);
export { PaneviewAngularComponent };
