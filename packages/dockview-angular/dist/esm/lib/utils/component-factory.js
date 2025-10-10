import { AngularRenderer } from './angular-renderer';
import { AngularGridviewPanel } from '../gridview/angular-gridview-panel';
import { AngularSplitviewPanel } from '../splitview/angular-splitview-panel';
import { AngularPanePart } from '../paneview/angular-pane-part';
export class AngularFrameworkComponentFactory {
    constructor(components, injector, environmentInjector, tabComponents, watermarkComponent, headerActionsComponents, defaultTabComponent) {
        this.components = components;
        this.injector = injector;
        this.environmentInjector = environmentInjector;
        this.tabComponents = tabComponents;
        this.watermarkComponent = watermarkComponent;
        this.headerActionsComponents = headerActionsComponents;
        this.defaultTabComponent = defaultTabComponent;
    }
    // For DockviewComponent
    createDockviewComponent(options) {
        const component = this.components[options.name];
        if (!component) {
            throw new Error(`Component '${options.name}' not found in component registry`);
        }
        const renderer = new AngularRenderer({
            component,
            injector: this.injector,
            environmentInjector: this.environmentInjector
        });
        renderer.init(options);
        return renderer;
    }
    // For GridviewComponent  
    createGridviewComponent(options) {
        const component = this.components[options.name];
        if (!component) {
            throw new Error(`Component '${options.name}' not found in component registry`);
        }
        return new AngularGridviewPanel(options.id, options.name, component, this.injector, this.environmentInjector);
    }
    // For SplitviewComponent
    createSplitviewComponent(options) {
        const component = this.components[options.name];
        if (!component) {
            throw new Error(`Component '${options.name}' not found in component registry`);
        }
        return new AngularSplitviewPanel(options.id, options.name, component, this.injector, this.environmentInjector);
    }
    // For PaneviewComponent
    createPaneviewComponent(options) {
        const component = this.components[options.name];
        if (!component) {
            throw new Error(`Component '${options.name}' not found in component registry`);
        }
        return new AngularPanePart(component, this.injector, this.environmentInjector);
    }
    // Legacy method for backward compatibility
    createComponent(options) {
        return this.createDockviewComponent(options);
    }
    createTabComponent(options) {
        let component = this.tabComponents?.[options.name];
        if (!component && this.defaultTabComponent) {
            component = this.defaultTabComponent;
        }
        if (!component) {
            return undefined;
        }
        const renderer = new AngularRenderer({
            component,
            injector: this.injector,
            environmentInjector: this.environmentInjector
        });
        renderer.init(options);
        return renderer;
    }
    createWatermarkComponent() {
        if (!this.watermarkComponent) {
            throw new Error('Watermark component not provided');
        }
        const renderer = new AngularRenderer({
            component: this.watermarkComponent,
            injector: this.injector,
            environmentInjector: this.environmentInjector
        });
        renderer.init({});
        return renderer;
    }
    createHeaderActionsComponent(name) {
        const component = this.headerActionsComponents?.[name];
        if (!component) {
            return undefined;
        }
        const renderer = new AngularRenderer({
            component,
            injector: this.injector,
            environmentInjector: this.environmentInjector
        });
        renderer.init({});
        return renderer;
    }
}
