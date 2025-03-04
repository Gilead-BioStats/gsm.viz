/**
 * @jest-environment jsdom
 */

import results from '../../examples/data/results.json';
import metricMetadata from '../../examples/data/metricMetadata.json';
import groupMetadata from '../../examples/data/groupMetadata.json';

import groupOverview from '../../src/groupOverview.js';

const GroupLevel = 'Site';

let metricPrefix;
if (GroupLevel === 'Site') {
    metricPrefix = 'kri';
} else if (GroupLevel === 'Country') {
    metricPrefix = 'cou';
} else if (GroupLevel === 'Study') {
    metricPrefix = 'qtl';
}

const regex = new RegExp(`^${metricPrefix}`);

//const SnapshotDate = d3.max(results, (d) => d.SnapshotDate);
//results = results.filter(
//    (d) => d.SnapshotDate === SnapshotDate
//);

const resultsSubset = results.filter((d) => regex.test(d.MetricID));
const metricMetadataSubset = metricMetadata.filter((d) =>
    regex.test(d.MetricID)
);

describe('group overview is generated', () => {
    const container = document.createElement('div');

    test('group overview is generated with all arguments', () => {
        const instance = groupOverview(
            container,
            resultsSubset,
            {
                GroupLevel,
            },
            groupMetadata,
            metricMetadataSubset
        );

        expect(instance).not.toBeNull();
    });

    test(`group overview is generated with missing optional arguments`, () => {
        const instance = groupOverview(
            container,
            resultsSubset,
            null,
            groupMetadata,
            metricMetadataSubset
        );

        expect(instance).not.toBeNull();
    });

    test(`group overview is generated with empty results`, () => {
        const instance = groupOverview(
            container,
            [],
            {
                GroupLevel,
            },
            groupMetadata,
            metricMetadataSubset
        );

        expect(instance).not.toBeNull();
    });
});
