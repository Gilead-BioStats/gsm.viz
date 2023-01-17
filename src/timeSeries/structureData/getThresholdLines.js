import { rollup } from 'd3';
import checkThresholds from '../../util/checkThresholds';
import colorScheme from '../../util/colorScheme';

export default function getThresholdLines(_thresholds_, config) {
    const thresholds = [
        ...rollup(
            _thresholds_.filter((d) => d.param === 'vThreshold'),
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

    const thresholdData = [
        ...rollup(
            thresholds,
            (group) => ({
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
            }),
            (d) => d.flag
        ),
    ].map((d) => d[1]);

    return thresholdData;
}
