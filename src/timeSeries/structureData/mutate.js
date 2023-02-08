import { ascending, rollup } from 'd3';
import getLabels from './getLabels';

export default function mutate(_data_, config, _thresholds_, _intervals_) {
    const data = _data_
        .map((d) => {
            const datum = { ...d };

            // Merge confidence intervals onto standard analysis output.
            if ([undefined, null].includes(_intervals_) === false) {
                const intervals = _intervals_.filter(
                    (interval) => interval.snapshot_date === datum.snapshot_date
                );
                datum.lowerCI = intervals.find(
                    (interval) => interval.param === 'LowCI'
                )?.value;
                datum.upperCI = intervals.find(
                    (interval) => interval.param === 'UpCI'
                )?.value;
            }

            return datum;
        })
        .sort((a, b) => ascending(a[config.x], b[config.x]));

    const labels = getLabels(data, config);

    let thresholds = null;
    if (Array.isArray(_thresholds_) && config.variableThresholds) {
        thresholds = _thresholds_
            .filter((d) => labels.includes(d[config.x]))
            .map((d) => ({ ...d }))
            .sort((a, b) => ascending(a[config.x], b[config.x]));
    }

    let intervals = null;
    if (Array.isArray(_intervals_)) {
        intervals = _intervals_
            .filter((d) => labels.includes(d[config.x]))
            .map((d) => ({ ...d }))
            .sort((a, b) => ascending(a[config.x], b[config.x]));
    }

    // Check whether all group IDs are numeric.
    const numericGroupIDs = data.every((d) => /^\d+$/.test(d.groupid));

    // Apply custom sort to control display of group IDs in tooltip of overlapping points. Within
    // each combination of x- and y-values sort selected group ID first and then by group ID.
    rollup(
        data,
        (group) => {
            group
                .sort((a, b) => {
                    const selected =
                        config.selectedGroupIDs.includes(b.groupid) -
                        config.selectedGroupIDs.includes(a.groupid);

                    const groupid = numericGroupIDs
                        ? ascending(+a.groupid, +b.groupid)
                        : ascending(a.groupid, b.groupid);

                    return selected !== 0 ? selected : groupid;
                })
                .forEach((d, i) => {
                    d.duplicate = i > 0;
                });
        },
        (d) => d[config.x],
        (d) => d[config.y]
    );

    return {
        data,
        labels,
        thresholds,
        intervals,
    };
}
