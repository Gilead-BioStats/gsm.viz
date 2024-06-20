import { ascending, rollup } from 'd3';

export default function identifyDuplicatePoints(data, config, mutate = true) {
    // Check whether all Group IDs are numeric.
    const numericGroupIDs = data.every((d) => /^\d+$/.test(d.GroupID));

    data.sort((a, b) => {
        const x = ascending(a[config.x], b[config.x]);
        const y = ascending(a[config.y], b[config.y]);

        const selected =
            config.selectedGroupIDs.includes(b.GroupID) -
            config.selectedGroupIDs.includes(a.GroupID);

        const GroupID = numericGroupIDs
            ? ascending(+a.GroupID, +b.GroupID)
            : ascending(a.GroupID, b.GroupID);

        return x || y || selected || GroupID;
    });

    // Apply custom sort to control display of Group IDs in tooltip of overlapping points. Within
    // each combination of x- and y-values sort selected Group ID first and then by Group ID.
    if (mutate)
        rollup(
            data,
            (Group) => {
                Group.forEach((d, i) => {
                    d.duplicate = i > 0;
                });
            },
            (d) => d[config.x],
            (d) => d[config.y]
        );
}
