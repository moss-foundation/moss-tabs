import type { DockviewGroupPanel, IContentRenderer, IGroupHeaderProps, IHeaderActionsRenderer, ITabRenderer, IWatermarkRenderer, PanelUpdateEvent, Parameters, TabPartInitParameters, WatermarkRendererInitParameters } from 'dockview-core';
import { type ComponentOptionsBase, type DefineComponent, type ComponentInternalInstance } from 'vue';
export type ComponentInterface = ComponentOptionsBase<any, any, any, any, any, any, any, any>;
export type VueComponent<T = any> = DefineComponent<T>;
export declare function findComponent(parent: ComponentInternalInstance, name: string): VueComponent | null;
/**
 * @see https://vuejs.org/api/render-function.html#clonevnode
 * @see https://vuejs.org/api/render-function.html#mergeprops
 */
export declare function mountVueComponent<T extends Record<string, any>>(component: VueComponent<T>, parent: ComponentInternalInstance, props: T, element: HTMLElement): {
    update: (newProps: any) => void;
    dispose: () => void;
};
declare abstract class AbstractVueRenderer {
    protected readonly component: VueComponent;
    protected readonly parent: ComponentInternalInstance;
    protected readonly _element: HTMLElement;
    get element(): HTMLElement;
    constructor(component: VueComponent, parent: ComponentInternalInstance);
}
export declare class VueRenderer extends AbstractVueRenderer implements ITabRenderer, IContentRenderer {
    private _renderDisposable;
    private _api;
    private _containerApi;
    init(parameters: TabPartInitParameters): void;
    update(event: PanelUpdateEvent<Parameters>): void;
    dispose(): void;
}
export declare class VueWatermarkRenderer extends AbstractVueRenderer implements IWatermarkRenderer {
    private _renderDisposable;
    get element(): HTMLElement;
    init(parameters: WatermarkRendererInitParameters): void;
    update(event: PanelUpdateEvent<Parameters>): void;
    dispose(): void;
}
export declare class VueHeaderActionsRenderer extends AbstractVueRenderer implements IHeaderActionsRenderer {
    private _renderDisposable;
    get element(): HTMLElement;
    constructor(component: VueComponent, parent: ComponentInternalInstance, group: DockviewGroupPanel);
    init(props: IGroupHeaderProps): void;
    dispose(): void;
}
export {};
