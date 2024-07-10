import { ascending } from 'd3';
import groupMetadata from '../../examples/data/groupMetadata.json';
import structureGroupMetadata from '../../src/util/structureGroupMetadata.js';

describe('group metadata is structured correctly', () => {
    const config = {
        GroupLevel: 'Country',
    };

    const structuredGroupMetadata = structureGroupMetadata(groupMetadata, config);

    test('group metadata is structured correctly', () => {
        expect(structuredGroupMetadata instanceof Map).toBe(true);
    });

    test('group metadata contains all group IDs', () => {
        const actualGroups = Array.from(structuredGroupMetadata.keys())
            .sort(ascending);

        const expectedGroups = [...new Set(groupMetadata
            .filter((d) => d.GroupLevel === config.GroupLevel)
            .map((d) => d.GroupID)
        )].sort(ascending);

        expect(actualGroups).toEqual(expectedGroups);
    });
});
