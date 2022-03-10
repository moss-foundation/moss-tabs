import { CompositeDisposable, MutableDisposable } from '../lifecycle';

describe('lifecycle', () => {
    test('mutable disposable', () => {
        const mutableDisposable = new MutableDisposable();

        let disposed = 0;

        const disposable = () => ({
            dispose: () => {
                disposed++;
            },
        });

        mutableDisposable.value = disposable();
        expect(disposed).toBe(0);

        mutableDisposable.value = disposable();
        expect(disposed).toBe(1);

        mutableDisposable.dispose();
        expect(disposed).toBe(2);

        mutableDisposable.dispose();
    });

    test('composite disposable', () => {
        const d1 = {
            dispose: jest.fn(),
        };
        const d2 = {
            dispose: jest.fn(),
        };
        const d3 = {
            dispose: jest.fn(),
        };
        const d4 = {
            dispose: jest.fn(),
        };

        const cut = new CompositeDisposable(d1, d2);
        cut.addDisposables(d3, d4);

        cut.dispose();

        expect(d1.dispose).toHaveBeenCalledTimes(1);
        expect(d2.dispose).toHaveBeenCalledTimes(1);
        expect(d3.dispose).toHaveBeenCalledTimes(1);
        expect(d4.dispose).toHaveBeenCalledTimes(1);
    });
});
