import groupMetadata from '../../examples/data/groupMetadata.json';
import schema from '../../src/data/schema/groupMetadata.json';
import checkInput from '../../src/data/checkInput.js';
import getType from '../../src/data/checkInput/getType.js';

describe('group metadata schema', () => {
    test('group metadata schema type matches data type of group metadata', () => {
        let resultsType = typeof groupMetadata;

        if (resultsType === 'object' && Array.isArray(groupMetadata))
            resultsType = 'array';

        expect(resultsType).toBe(schema.type);
    });

    test('type of group metadata schema items matches data type of group metadata items', () => {
        const group = groupMetadata[Math.floor(groupMetadata.length * Math.random())];

        expect(typeof group).toBe(schema.items.type);
    });

    test('properties of group metadata schema items match properties of group metadata items', () => {
        const group = groupMetadata[Math.floor(groupMetadata.length * Math.random())];
        const propsSchema = Object.keys(schema.items.properties).sort();
        const propsResult = Object.keys(group)
            .sort()
            .filter((prop) => propsSchema.includes(prop));

        expect(propsResult).toEqual(propsSchema);
    });
});
