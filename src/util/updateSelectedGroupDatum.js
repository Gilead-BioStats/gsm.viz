import { descending } from 'd3-array';
import resultsSchema from '../data/schema/results.json';

/**
 * Update the selected group datum.
 *
 * @param {Array} results The results data.
 * @param {Array} selectedGroupIDs The selected group IDs.
 *
 * @returns {Object} The selected group datum.
 */
export default function updateSelectedGroupDatum(results, selectedGroupIDs) {
    if (selectedGroupIDs.length !== 1) return {};

    // Capture the result for the selected group, prioritizing the result of the most recent snapshot.
    const result = results
        .sort((a, b) => descending(a.SnapshotDate, b.SnapshotDate))
        .find((d) => selectedGroupIDs.includes(d.GroupID));

    // Limit the result to required fields.
    const selectedGroupDatum = resultsSchema.items.required.reduce(
        (acc, item) => {
            acc[item] = result[item];

            return acc;
        },
        {}
    );

    return selectedGroupDatum;
}
