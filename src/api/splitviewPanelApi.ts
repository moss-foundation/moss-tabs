import { Emitter, Event } from '../events';
import { IDisposable } from '../lifecycle';
import { FunctionOrValue } from '../types';
import { PanelApiImpl, PanelApi } from './panelApi';

interface PanelConstraintChangeEvent2 {
    minimumSize?: FunctionOrValue<number>;
    maximumSize?: FunctionOrValue<number>;
}

export interface PanelConstraintChangeEvent {
    minimumSize?: number;
    maximumSize?: number;
}

export interface PanelSizeEvent {
    size: number;
}

export interface SplitviewPanelApi extends PanelApi {
    onDidConstraintsChange: Event<PanelConstraintChangeEvent>;
    setConstraints(value: PanelConstraintChangeEvent2): void;
    setSize(event: PanelSizeEvent): void;
}

export class SplitviewPanelApiImpl
    extends PanelApiImpl
    implements SplitviewPanelApi, IDisposable {
    readonly _onDidConstraintsChangeInternal = new Emitter<PanelConstraintChangeEvent2>();
    readonly onDidConstraintsChangeInternal: Event<PanelConstraintChangeEvent2> = this
        ._onDidConstraintsChangeInternal.event;
    //

    readonly _onDidConstraintsChange = new Emitter<PanelConstraintChangeEvent>({
        replay: true,
    });
    readonly onDidConstraintsChange: Event<PanelConstraintChangeEvent> = this
        ._onDidConstraintsChange.event;
    //

    readonly _onDidSizeChange = new Emitter<PanelSizeEvent>();
    readonly onDidSizeChange: Event<PanelSizeEvent> = this._onDidSizeChange
        .event;
    //

    constructor(id: string) {
        super(id);
    }

    setConstraints(value: PanelConstraintChangeEvent2) {
        this._onDidConstraintsChangeInternal.fire(value);
    }

    setSize(event: PanelSizeEvent) {
        this._onDidSizeChange.fire(event);
    }

    dispose() {
        super.dispose();
        this._onDidConstraintsChange.dispose();
        this._onDidSizeChange.dispose();
    }
}
