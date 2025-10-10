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
import { createGridview, PROPERTY_KEYS_GRIDVIEW } from 'dockview-core';
import { AngularFrameworkComponentFactory } from '../utils/component-factory';
import { AngularLifecycleManager } from '../utils/lifecycle-utils';
let GridviewAngularComponent = class GridviewAngularComponent {
    constructor() {
        this.ready = new EventEmitter();
        this.lifecycleManager = new AngularLifecycleManager();
        this.injector = inject(Injector);
        this.environmentInjector = inject(EnvironmentInjector);
    }
    ngOnInit() {
        this.initializeGridview();
    }
    ngOnDestroy() {
        this.lifecycleManager.destroy();
        if (this.gridviewApi) {
            this.gridviewApi.dispose();
        }
    }
    ngOnChanges(changes) {
        if (this.gridviewApi) {
            const coreChanges = {};
            let hasChanges = false;
            // Check for changes in core gridview properties
            PROPERTY_KEYS_GRIDVIEW.forEach(key => {
                if (changes[key] && !changes[key].isFirstChange()) {
                    coreChanges[key] = changes[key].currentValue;
                    hasChanges = true;
                }
            });
            if (hasChanges) {
                this.gridviewApi.updateOptions(coreChanges);
            }
        }
    }
    getGridviewApi() {
        return this.gridviewApi;
    }
    initializeGridview() {
        if (!this.components) {
            throw new Error('GridviewAngularComponent: components input is required');
        }
        const coreOptions = this.extractCoreOptions();
        const frameworkOptions = this.createFrameworkOptions();
        this.gridviewApi = createGridview(this.containerRef.nativeElement, {
            ...coreOptions,
            ...frameworkOptions
        });
        // Emit ready event
        this.ready.emit({ api: this.gridviewApi });
    }
    extractCoreOptions() {
        const coreOptions = {};
        PROPERTY_KEYS_GRIDVIEW.forEach(key => {
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
                return componentFactory.createGridviewComponent(options);
            }
        };
    }
};
__decorate([
    ViewChild('gridviewContainer', { static: true }),
    __metadata("design:type", ElementRef)
], GridviewAngularComponent.prototype, "containerRef", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridviewAngularComponent.prototype, "components", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], GridviewAngularComponent.prototype, "className", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], GridviewAngularComponent.prototype, "orientation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], GridviewAngularComponent.prototype, "proportionalLayout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], GridviewAngularComponent.prototype, "hideBorders", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], GridviewAngularComponent.prototype, "debug", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], GridviewAngularComponent.prototype, "disableAutoResizing", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], GridviewAngularComponent.prototype, "ready", void 0);
GridviewAngularComponent = __decorate([
    Component({
        selector: 'dv-gridview',
        template: '<div #gridviewContainer class="gridview-container"></div>',
        styles: [`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        
        .gridview-container {
            width: 100%;
            height: 100%;
        }
    `],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GridviewAngularComponent);
export { GridviewAngularComponent };
