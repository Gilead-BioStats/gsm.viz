import { rollup } from 'd3';

/**
 * Purpose: Create a metadata object for each group ID in the input dataset.
 *
 * @param {Array} groupMetadata - an array of objects containing group metadata
 * @param {Object} config - chart configuration and metadata
 *
 * @returns {Map} - a metadata object for each group ID in the input dataset
 */
export default function structureGroupMetadata(groupMetadata, config) {
    if (groupMetadata === null) return null;

    const structuredGroupMetadata = rollup(
        groupMetadata,
        group => group.reduce((acc, cur) => {
            acc[cur.Param] = cur.Value;
            return acc;
        }, {}),
        d => d.GroupLevel,
        d => d.GroupID
    );

    const keys = Array.from(structuredGroupMetadata.keys());

    if (keys.includes(config.GroupLevel)) {
        return structuredGroupMetadata.get(config.GroupLevel);
    } else {
        console.warn(
            `Group level "${config.GroupLevel}" not found in group metadata.`
        );

        return null;
    }
};
