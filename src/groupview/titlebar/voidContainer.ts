import { last } from '../../array';
import { getPanelData } from '../../dnd/dataTransfer';
import { Droptarget, DroptargetEvent } from '../../dnd/droptarget';
import { GroupDragHandler } from '../../dnd/groupDragHandler';
import { DockviewComponent } from '../../dockview/dockviewComponent';
import { addDisposableListener, Emitter, Event } from '../../events';
import { CompositeDisposable } from '../../lifecycle';
import { DockviewDropTargets } from '../dnd';
import { GroupPanel } from '../groupviewPanel';

export class VoidContainer extends CompositeDisposable {
    private readonly _element: HTMLElement;
    private readonly voidDropTarget: Droptarget;

    private readonly _onDrop = new Emitter<DroptargetEvent>();
    readonly onDrop: Event<DroptargetEvent> = this._onDrop.event;

    get element() {
        return this._element;
    }

    constructor(
        private readonly accessor: DockviewComponent,
        private readonly group: GroupPanel
    ) {
        super();

        this._element = document.createElement('div');

        this._element.className = 'void-container';
        this._element.tabIndex = 0;
        this._element.draggable = true;

        this.addDisposables(
            this._onDrop,
            addDisposableListener(this._element, 'click', () => {
                this.accessor.doSetGroupActive(this.group);
            })
        );

        const handler = new GroupDragHandler(this._element, accessor.id, group);

        this.voidDropTarget = new Droptarget(this._element, {
            validOverlays: 'none',
            canDisplayOverlay: (event) => {
                const data = getPanelData();

                if (data && this.accessor.id === data.viewId) {
                    // don't show the overlay if the tab being dragged is the last panel of this group
                    return last(this.group.panels)?.id !== data.panelId;
                }

                return group.model.canDisplayOverlay(
                    event,
                    DockviewDropTargets.Panel
                );
            },
        });

        this.addDisposables(
            handler,
            this.voidDropTarget.onDrop((event) => {
                this._onDrop.fire(event);
            }),
            this.voidDropTarget
        );
    }
}
