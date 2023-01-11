import flagCountsByGroup from '../../examples/data/flag_counts_by_group.json';
import flagCountsByKRI from '../../examples/data/flag_counts_by_kri.json';
import schema from '../../src/data/schema/flagCounts.json';
import snapshotDate from '../../src/data/schema/snapshotDate.json';
import checkInput from '../../src/data/checkInput';
import getType from '../../src/data/checkInput/getType';

schema.items.properties.snapshot_date = snapshotDate;

describe('flag counts schema with flag counts by group', () => {
    const flagCounts = flagCountsByGroup;

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
        const propsSchema = Object.keys(schema.items.properties)
            .filter((prop) => prop !== 'workflowid')
            .sort();

        expect(propsResult).toEqual(propsSchema);
    });
});

describe('flag counts schema with flag counts by KRI', () => {
    const flagCounts = flagCountsByKRI;

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
        const propsSchema = Object.keys(schema.items.properties)
            .filter((prop) => prop !== 'groupid')
            .sort();

        expect(propsResult).toEqual(propsSchema);
    });
});
