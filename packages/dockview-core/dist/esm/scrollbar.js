import { toggleClass, watchElementResize } from './dom';
import { addDisposableListener } from './events';
import { CompositeDisposable } from './lifecycle';
import { clamp } from './math';
export class Scrollbar extends CompositeDisposable {
    get element() {
        return this._element;
    }
    constructor(scrollableElement) {
        super();
        this.scrollableElement = scrollableElement;
        this._scrollLeft = 0;
        this._element = document.createElement('div');
        this._element.className = 'dv-scrollable';
        this._horizontalScrollbar = document.createElement('div');
        this._horizontalScrollbar.className = 'dv-scrollbar-horizontal';
        this.element.appendChild(scrollableElement);
        this.element.appendChild(this._horizontalScrollbar);
        this.addDisposables(addDisposableListener(this.element, 'wheel', (event) => {
            // Normalize wheel delta for lines vs pixels.
            function normalizeDelta(e, axis) {
                const delta = axis === 'x' ? e.deltaX : e.deltaY;
                // DOM_DELTA_LINE = 1 -> convert lines to pixels (~16px per line typical)
                if (e.deltaMode === 1)
                    return delta * 16;
                return delta; // DOM_DELTA_PIXEL (0) or others
            }
            const canScrollHorizontally = this.scrollableElement.scrollWidth >
                this.scrollableElement.clientWidth;
            if (canScrollHorizontally && !event.shiftKey) {
                const absX = Math.abs(event.deltaX);
                const absY = Math.abs(event.deltaY);
                // Handle horizontal touchpad gestures (two-finger horizontal swipe)
                if (absX > absY && absX > 0) {
                    const deltaX = normalizeDelta(event, 'x');
                    this._scrollLeft += deltaX;
                    this.calculateScrollbarStyles();
                    event.preventDefault();
                    return;
                }
                // Handle vertical touchpad gestures (two-finger vertical/diagonal swipe)
                // Convert vertical scrolling to horizontal for tab navigation
                if (absY > absX && absY > 0) {
                    const deltaY = normalizeDelta(event, 'y');
                    // Positive deltaY means user scrolled down -> move tabs right (increase scrollLeft)
                    this._scrollLeft += deltaY;
                    this.calculateScrollbarStyles();
                    event.preventDefault();
                    return;
                }
            }
            this.calculateScrollbarStyles();
        }), addDisposableListener(this._horizontalScrollbar, 'pointerdown', (event) => {
            event.preventDefault();
            toggleClass(this.element, 'dv-scrollable-scrolling', true);
            const originalClientX = event.clientX;
            const originalScrollLeft = this._scrollLeft;
            const onPointerMove = (event) => {
                const deltaX = event.clientX - originalClientX;
                const { clientWidth } = this.element;
                const { scrollWidth } = this.scrollableElement;
                const p = clientWidth / scrollWidth;
                this._scrollLeft = originalScrollLeft + deltaX / p;
                this.calculateScrollbarStyles();
            };
            const onEnd = () => {
                toggleClass(this.element, 'dv-scrollable-scrolling', false);
                document.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('pointerup', onEnd);
                document.removeEventListener('pointercancel', onEnd);
            };
            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onEnd);
            document.addEventListener('pointercancel', onEnd);
        }), addDisposableListener(this.element, 'scroll', () => {
            this.calculateScrollbarStyles();
        }), addDisposableListener(this.scrollableElement, 'scroll', () => {
            this._scrollLeft = this.scrollableElement.scrollLeft;
            this.calculateScrollbarStyles();
        }), watchElementResize(this.element, () => {
            toggleClass(this.element, 'dv-scrollable-resizing', true);
            if (this._animationTimer) {
                clearTimeout(this._animationTimer);
            }
            this._animationTimer = setTimeout(() => {
                clearTimeout(this._animationTimer);
                toggleClass(this.element, 'dv-scrollable-resizing', false);
            }, 500);
            this.calculateScrollbarStyles();
        }));
    }
    calculateScrollbarStyles() {
        const { clientWidth } = this.element;
        const { scrollWidth } = this.scrollableElement;
        const hasScrollbar = scrollWidth > clientWidth;
        if (hasScrollbar) {
            const px = clientWidth * (clientWidth / scrollWidth);
            this._horizontalScrollbar.style.width = `${px}px`;
            this._scrollLeft = clamp(this._scrollLeft, 0, this.scrollableElement.scrollWidth - clientWidth);
            this.scrollableElement.scrollLeft = this._scrollLeft;
            const percentageComplete = this._scrollLeft / (scrollWidth - clientWidth);
            this._horizontalScrollbar.style.left = `${(clientWidth - px) * percentageComplete}px`;
        }
        else {
            this._horizontalScrollbar.style.width = `0px`;
            this._horizontalScrollbar.style.left = `0px`;
            this._scrollLeft = 0;
        }
    }
}
Scrollbar.MouseWheelSpeed = 1;
