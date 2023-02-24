import { ascending, rollup } from 'd3';

export default function identifyDuplicatePoints(data, config, mutate = true) {
    // Check whether all group IDs are numeric.
    const numericGroupIDs = data.every((d) => /^\d+$/.test(d.groupid));

    data.sort((a, b) => {
        const x = ascending(a[config.x], b[config.x]);
        const y = ascending(a[config.y], b[config.y]);

        const selected =
            config.selectedGroupIDs.includes(b.groupid) -
            config.selectedGroupIDs.includes(a.groupid);

        const groupid = numericGroupIDs
            ? ascending(+a.groupid, +b.groupid)
            : ascending(a.groupid, b.groupid);

        return x || y || selected || groupid;
    });

    // Apply custom sort to control display of group IDs in tooltip of overlapping points. Within
    // each combination of x- and y-values sort selected group ID first and then by group ID.
    if (mutate)
        rollup(
            data,
            (group) => {
                group.forEach((d, i) => {
                    d.duplicate = i > 0;
                });
            },
            (d) => d[config.x],
            (d) => d[config.y]
        );
}
