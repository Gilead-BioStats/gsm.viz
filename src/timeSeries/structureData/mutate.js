import { ascending } from 'd3';
import getLabels from './getLabels.js';
import identifyDuplicatePoints from '../../util/identifyDuplicatePoints.js';

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

    identifyDuplicatePoints(data, config);

    return {
        data,
        labels,
        thresholds,
        intervals,
    };
}
