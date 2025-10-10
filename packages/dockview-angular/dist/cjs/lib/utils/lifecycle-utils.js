"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAngularDisposable = exports.AngularLifecycleManager = exports.AngularDisposable = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class AngularDisposable {
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
exports.AngularDisposable = AngularDisposable;
class AngularLifecycleManager {
    constructor() {
        this.destroySubject = new rxjs_1.Subject();
        this.disposables = [];
    }
    get destroy$() {
        return this.destroySubject.asObservable();
    }
    addDisposable(disposable) {
        this.disposables.push(disposable);
    }
    takeUntilDestroy() {
        return (0, operators_1.takeUntil)(this.destroySubject);
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
exports.AngularLifecycleManager = AngularLifecycleManager;
function createAngularDisposable(disposeCallback) {
    const disposable = new AngularDisposable();
    if (disposeCallback) {
        disposable.addDisposeCallback(disposeCallback);
    }
    return disposable;
}
exports.createAngularDisposable = createAngularDisposable;
