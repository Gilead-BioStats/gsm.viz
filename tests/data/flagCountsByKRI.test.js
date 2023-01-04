import flagCounts from '../../examples/data/flag_counts_by_kri.json';
import schema from '../../src/data/schema/flagCountsByKRI.json';
import checkInput from '../../src/data/checkInput';
import getType from '../../src/data/checkInput/getType';

describe('flag counts schema', () => {
    test('flag counts schema type matches data type of flag counts', () => {
        let flagCountsType = typeof flagCounts;

        if (flagCountsType === 'object' && Array.isArray(flagCounts))
            flagCountsType = 'array';

        expect(flagCountsType).toBe(schema.type);
    });

    test('type of flag counts schema items matches data type of flag counts items', () => {
        const flagCount =
            flagCounts[Math.floor(flagCounts.length * Math.random())];

        expect(typeof flagCount).toBe(schema.items.type);
    });

    test('properties of flag counts schema items match properties of flag counts items', () => {
        const flagCount =
            flagCounts[Math.floor(flagCounts.length * Math.random())];
        const propsResult = Object.keys(flagCount).sort();
        const propsSchema = Object.keys(schema.items.properties).sort();

        expect(propsResult).toEqual(propsSchema);
    });
});
