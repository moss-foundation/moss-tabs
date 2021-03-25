import { clamp } from '../math';

describe('math', () => {
    describe('clamp', () => {
        it('should clamp between a minimum and maximum value', () => {
            expect(clamp(45, 40, 50)).toBe(45);
            expect(clamp(35, 40, 50)).toBe(40);
            expect(clamp(55, 40, 50)).toBe(50);
        });

        it('should throw an error if min > max', () => {
            expect(() => clamp(55, 50, 40)).toThrow(
                '50 > 40 is an invalid condition'
            );
        });
    });
});
