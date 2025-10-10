import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class AngularDisposable {
    constructor() {
        this._isDisposed = false;
        this.disposeCallbacks = [];
    }
    get isDisposed() {
        return this._isDisposed;
    }
    addDisposeCallback(callback) {
        if (this._isDisposed) {
            callback();
            return;
        }
        this.disposeCallbacks.push(callback);
    }
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        this.disposeCallbacks.forEach(callback => {
            try {
                callback();
            }
            catch (error) {
                console.error('Error in dispose callback:', error);
            }
        });
        this.disposeCallbacks = [];
    }
}
export class AngularLifecycleManager {
    constructor() {
        this.destroySubject = new Subject();
        this.disposables = [];
    }
    get destroy$() {
        return this.destroySubject.asObservable();
    }
    addDisposable(disposable) {
        this.disposables.push(disposable);
    }
    takeUntilDestroy() {
        return takeUntil(this.destroySubject);
    }
    destroy() {
        this.destroySubject.next();
        this.destroySubject.complete();
        this.disposables.forEach(disposable => {
            try {
                disposable.dispose();
            }
            catch (error) {
                console.error('Error disposing resource:', error);
            }
        });
        this.disposables = [];
    }
}
export function createAngularDisposable(disposeCallback) {
    const disposable = new AngularDisposable();
    if (disposeCallback) {
        disposable.addDisposeCallback(disposeCallback);
    }
    return disposable;
}
