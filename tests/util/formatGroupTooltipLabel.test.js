import groupMetadata from '../../examples/data/groupMetadata.json';

import structureGroupMetadata from '../../src/util/structureGroupMetadata.js';
import formatGroupTooltipLabel from '../../src/util/formatGroupTooltipLabel.js';

const groupMetadataStructured = structureGroupMetadata(groupMetadata, {
    GroupLevel: 'Site',
});

describe('group attributes are formatted correctly', () => {
    test('if `groupTooltipKeys` is `null`, all group attributes are included', () => {
        const group = groupMetadataStructured.get('43');
        const config = {
            groupTooltipKeys: null,
        };

        const tooltipLabel = formatGroupTooltipLabel(group, config);

        expect(Object.keys(group).length).toEqual(tooltipLabel.length);
    });

    test('if `groupTooltipKeys` is specified, only those attributes are included', () => {
        const group = groupMetadataStructured.get('43');
        const config = {
            groupTooltipKeys: {
                ParticipantCount: 'parti time',
                SiteCount: 'sits bones',
            },
        };

        const tooltipLabel = formatGroupTooltipLabel(group, config);

        expect(tooltipLabel).toEqual([
            `parti time: ${group.ParticipantCount}`,
            `sits bones: ${group.SiteCount}`,
        ]);
    });

    test('if `groupTooltipKeys` contains a key that does not exist, it is ignored', () => {
        const group = groupMetadataStructured.get('43');
        const config = {
            groupTooltipKeys: {
                ParticipantCount: 'parti time',
                SiteCount: 'sits bones',
                NonexistentKey: 'nonexistent',
            },
        };

        const tooltipLabel = formatGroupTooltipLabel(group, config);

        expect(tooltipLabel).toEqual([
            `parti time: ${group.ParticipantCount}`,
            `sits bones: ${group.SiteCount}`,
        ]);
    });

    test('if `groupTooltipKeys` is an empty object, no attributes are included', () => {
        const group = groupMetadataStructured.get('43');
        const config = {
            groupTooltipKeys: {},
        };

        const tooltipLabel = formatGroupTooltipLabel(group, config);

        expect(tooltipLabel).toEqual([]);
    });
});
