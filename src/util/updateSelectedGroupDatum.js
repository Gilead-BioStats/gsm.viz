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

    const result = results.find((d) => selectedGroupIDs.includes(d.GroupID));

    const selectedGroupDatum = resultsSchema.items.required.reduce(
        (acc, item) => {
            acc[item] = result[item];

            return acc;
        },
        {}
    );

    return selectedGroupDatum;
}
