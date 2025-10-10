import { Observable } from 'rxjs';
import { DockviewIDisposable } from 'dockview-core';
export declare class AngularDisposable implements DockviewIDisposable {
    private _isDisposed;
    private disposeCallbacks;
    get isDisposed(): boolean;
    addDisposeCallback(callback: () => void): void;
    dispose(): void;
}
export declare class AngularLifecycleManager {
    private destroySubject;
    private disposables;
    get destroy$(): Observable<void>;
    addDisposable(disposable: DockviewIDisposable): void;
    takeUntilDestroy<T>(): (source: Observable<T>) => Observable<T>;
    destroy(): void;
}
export declare function createAngularDisposable(disposeCallback?: () => void): AngularDisposable;
