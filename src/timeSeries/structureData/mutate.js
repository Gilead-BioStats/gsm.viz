import { ascending } from 'd3';
import getLabels from './getLabels.js';
import identifyDuplicatePoints from '../../util/identifyDuplicatePoints.js';

export default function mutate(
    _results_,
    config,
    _thresholds_,
    _intervals_,
    groupMetadata = null
) {
    const results = _results_
        .map((d) => {
            const datum = { ...d };

            // attach group metadata to results
            if (groupMetadata !== null) {
                const group = groupMetadata.get(d.GroupID);

                // TODO: support longitudinal group metadata
                if (group !== undefined) {
                    datum.group = group;
                    datum.group.GroupLabel = datum.group.hasOwnProperty(config.GroupLabelKey)
                        ? datum.group[config.GroupLabelKey]
                        : datum.GroupID
                }
            }

            // Merge confidence intervals onto standard analysis output.
            if ([undefined, null].includes(_intervals_) === false) {
                const intervals = _intervals_.filter(
                    (interval) => interval.SnapshotDate === datum.SnapshotDate
                );
                datum.lowerCI = intervals.find(
                    (interval) => interval.Param === 'LowCI'
                )?.Value;
                datum.upperCI = intervals.find(
                    (interval) => interval.Param === 'UpCI'
                )?.Value;
            }

            return datum;
        })
        .sort((a, b) => ascending(a[config.x], b[config.x]));

    const labels = getLabels(results, config);

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

    identifyDuplicatePoints(results, config);

    return {
        results,
        labels,
        thresholds,
        intervals,
    };
}
