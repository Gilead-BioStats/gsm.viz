import coalesce from '../../src/util/coalesce.js';

describe('utility functions', () => {
    test('coalesce returns default when undefined value supplied', () => {
        expect(coalesce(undefined, 'default')).not.toBeUndefined();
    });

    test('coalesce returns value and not default when defined', () => {
        expect(coalesce('value', 'default')).toBe('value');
    });
});
