import { format, timeFormat, timeParse } from 'd3';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    tooltipAesthetics.padding = 4;
    tooltipAesthetics.caretSize = 0;

    return {
        callbacks: {
            label: function (data) {
                const fmt =
                    config.y === 'score'
                        ? '.1f'
                        : config.y === 'metric'
                        ? '.3f'
                        : ',d';
                const date = timeFormat("'%y %b %d")(
                    timeParse('%Y-%m-%d')(data.label)
                );
                return config.dataType === 'continuous'
                    ? `${date}: ${format(fmt)(data.parsed.y)}`
                    : [
                          `${date}: ${format(fmt)(data.raw.n_flagged)} flagged`,
                          `${date}: ${format(fmt)(data.raw.n_at_risk)} at risk`,
                      ];
            },
            title: () => null,
            footer: () => null,
        },
        displayColors: config.dataType === 'continuous',
        ...tooltipAesthetics,
    };
}
