// Import the colorScheme module to test
import colorScheme from '../../src/util/colorScheme';
import falsy from '../../src/util/falsy';

describe('colorScheme', () => {

    test('should contain 4 base colors', () => {
        expect(colorScheme.length).toBe(4);
    });

    test('should have correct properties for Green Flag', () => {
        const green = colorScheme.green;
        expect(green).toBeDefined();
        expect(green.description).toBe('Green Flag');
        expect(green.Flag).toEqual([0]);
    });

    test('should have correct properties for Amber Flag', () => {
        const green = colorScheme.amber;
        expect(green).toBeDefined();
        expect(green.description).toBe('Amber Flag');
        expect(green.Flag).toEqual([-1, 1]);
    });

    test('should have correct properties for Red Flag', () => {
        const green = colorScheme.red;
        expect(green).toBeDefined();
        expect(green.description).toBe('Red Flag');
        expect(green.Flag).toEqual([-2, 2]);
    });

    test('should have correct properties for No Flag', () => {
        const noFlag = colorScheme.gray;
        expect(noFlag).toBeDefined();
        expect(noFlag.description).toBe('No Flag');
    });

    test('should have RGBA values assigned to each color', () => {
        colorScheme.forEach((color) => {
            expect(color.rgba).toBeDefined();
        });
    });

    test('should calculate amberRed correctly', () => {
        const amberRed = colorScheme.amberRed;
        expect(amberRed).toBeDefined();
        expect(amberRed.description).toBe('Amber or Red Flag');
        expect(amberRed.Flag).toEqual([-2, -1, 1, 2]);
        expect(amberRed.rgba).toBeDefined();
    });

});
