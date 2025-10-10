import { createComponent } from '@angular/core';
export class AngularRenderer {
    constructor(options) {
        this.options = options;
        this.componentRef = null;
        this._element = null;
    }
    get element() {
        if (!this._element) {
            throw new Error('Angular renderer not initialized');
        }
        return this._element;
    }
    init(parameters) {
        this.render(parameters);
    }
    update(params) {
        if (this.componentRef) {
            Object.keys(params).forEach(key => {
                if (this.componentRef.instance.hasOwnProperty(key)) {
                    this.componentRef.instance[key] = params[key];
                }
            });
            this.componentRef.changeDetectorRef.detectChanges();
        }
    }
    render(parameters) {
        try {
            // Create the component using modern Angular API
            this.componentRef = createComponent(this.options.component, {
                environmentInjector: this.options.environmentInjector || this.options.injector,
                elementInjector: this.options.injector
            });
            // Set initial parameters
            Object.keys(parameters).forEach(key => {
                if (this.componentRef.instance.hasOwnProperty(key)) {
                    this.componentRef.instance[key] = parameters[key];
                }
            });
            // Get the DOM element
            const hostView = this.componentRef.hostView;
            this._element = hostView.rootNodes[0];
            // Trigger change detection
            this.componentRef.changeDetectorRef.detectChanges();
        }
        catch (error) {
            console.error('Error creating Angular component:', error);
            throw error;
        }
    }
    dispose() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
        this._element = null;
    }
}
