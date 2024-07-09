// Purpose: To create a metadata object for each group in the structure dataset.
export default function structureGroupMetadata(groupMetadata, config) {
    if (groupMetadata === null) return null;

    const structuredGroupMetadata = d3.rollup(
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
