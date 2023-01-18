import { max, rollup } from 'd3';
import checkThresholds from '../../util/checkThresholds';
import colorScheme from '../../util/colorScheme';

export default function getThresholdLines(_thresholds_, config, labels) {
    let thresholdData = [null];

    if (Array.isArray(_thresholds_) && config.variableThresholds) {
        const thresholds = [
            ...rollup(
                _thresholds_
                    .filter((d) => d.param === 'vThreshold')
                    .sort((a, b) => (a < b ? -1 : b < a ? 1 : 0)),
                (group) => {
                    const flags = checkThresholds({}, group);

                    flags.forEach((flag) => {
                        flag.snapshot_date = group[0].snapshot_date;
                        flag.snapshot_date = group[0].snapshot_date;
                        flag.x = flag.snapshot_date;
                        flag.y = flag.threshold;
                        flag.color =
                            flags.length === 1
                                ? colorScheme.amberRed
                                : colorScheme.find((color) =>
                                      color.flag.includes(flag.flag)
                                  );
                    });

                    return flags;
                },
                (d) => d.snapshot_date
            ),
        ].flatMap((d) => d[1]);

        const latestSnapshotDate = max(labels);
        thresholdData = [
            ...rollup(
                thresholds,
                (group) => {
                    const dataset = {
                        adjustScaleRange: false,
                        borderColor: group[0].color.color,
                        //function (d) {
                        //    return d.color.color;
                        //},
                        borderDash: [2],
                        borderWidth: 1,
                        data: group,
                        hoverRadius: 0,
                        label: '',
                        purpose: 'annotation',
                        pointRadius: 0,
                        stepped: 'middle', // 'before', 'middle', 'after'
                        type: 'line',
                    };

                    const snapshotDates = [
                        ...new Set(group.map((d) => d[config.x])),
                    ];
                    const snapshotDate = max(snapshotDates);
                    if (snapshotDate < latestSnapshotDate) {
                        const threshold = {
                            ...dataset.data.find(
                                (d) => d[config.x] === snapshotDate
                            ),
                        };

                        threshold[config.x] = latestSnapshotDate;
                        threshold.x = latestSnapshotDate;

                        dataset.data.push(threshold);
                    }

                    return dataset;
                },
                (d) => d.flag
            ),
        ].map((d) => d[1]);
    }

    return thresholdData;
}
