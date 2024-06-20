import { max, rollup } from 'd3';
import checkThresholds from '../../util/checkThresholds.js';
import colorScheme from '../../util/colorScheme.js';

export default function getThresholdLines(_thresholds_, config, labels) {
    let thresholdData = [null];

    if (Array.isArray(_thresholds_) && config.variableThresholds) {
        const thresholds = [
            ...rollup(
                _thresholds_
                    .filter((d) => d.param === 'vThreshold')
                    .sort((a, b) => (a < b ? -1 : b < a ? 1 : 0)),
                (Group) => {
                    const flags = checkThresholds({}, Group);

                    flags.forEach((Flag) => {
                        Flag.snapshot_date = Group[0].snapshot_date;
                        Flag.snapshot_date = Group[0].snapshot_date;
                        Flag.x = Flag.snapshot_date;
                        Flag.y = Flag.threshold;
                        Flag.color =
                            flags.length === 1
                                ? colorScheme.amberRed
                                : colorScheme.find((color) =>
                                      color.Flag.includes(Flag.Flag)
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
                (Group) => {
                    const dataset = {
                        adjustScaleRange: false,
                        borderColor: Group[0].color.color,
                        //function (d) {
                        //    return d.color.color;
                        //},
                        borderDash: [2],
                        borderWidth: 1,
                        data: Group,
                        hoverRadius: 0,
                        label: '',
                        purpose: 'annotation',
                        pointRadius: 0,
                        stepped: 'middle', // 'before', 'middle', 'after'
                        type: 'line',
                    };

                    const snapshotDates = [
                        ...new Set(Group.map((d) => d[config.x])),
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
                (d) => d.Flag
            ),
        ].map((d) => d[1]);
    }

    return thresholdData;
}
