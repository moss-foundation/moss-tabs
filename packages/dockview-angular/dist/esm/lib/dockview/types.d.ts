import { Type } from '@angular/core';
import { DockviewOptions, DockviewReadyEvent, DockviewDidDropEvent, DockviewWillDropEvent, IDockviewPanelProps, IDockviewPanelHeaderProps, IWatermarkPanelProps, IDockviewHeaderActionsProps } from 'dockview-core';
export interface IDockviewAngularPanelProps extends IDockviewPanelProps {
}
export interface IDockviewAngularPanelHeaderProps extends IDockviewPanelHeaderProps {
}
export interface IDockviewAngularWatermarkProps extends IWatermarkPanelProps {
}
export interface IDockviewAngularHeaderActionsProps extends IDockviewHeaderActionsProps {
}
export interface DockviewAngularOptions extends DockviewOptions {
    components: Record<string, Type<any>>;
    tabComponents?: Record<string, Type<any>>;
    watermarkComponent?: Type<any>;
    defaultTabComponent?: Type<any>;
    leftHeaderActionsComponent?: Type<any>;
    rightHeaderActionsComponent?: Type<any>;
    prefixHeaderActionsComponent?: Type<any>;
}
export interface DockviewAngularComponentOptions extends DockviewAngularOptions {
}
export interface DockviewAngularEvents {
    ready: DockviewReadyEvent;
    didDrop: DockviewDidDropEvent;
    willDrop: DockviewWillDropEvent;
}
export { DockviewApi, DockviewReadyEvent, DockviewDidDropEvent, DockviewWillDropEvent, DockviewOptions } from 'dockview-core';
