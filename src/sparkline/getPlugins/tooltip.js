import { format, timeFormat, timeParse } from 'd3';
import getTooltipAesthetics from '../../util/getTooltipAesthetics.js';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    tooltipAesthetics.padding = 4;
    tooltipAesthetics.caretSize = 0;

    return {
        callbacks: {
            label: function (data) {
                const fmt =
                    config.y === 'Score'
                        ? '.1f'
                        : config.y === 'Metric'
                        ? '.3f'
                        : ',d';

                return config.dataType === 'continuous'
                    ? `${data.label}: ${format(fmt)(data.parsed.y)}`
                    : //[
                      `${data.label}: ${format(fmt)(
                          data.raw.n_flagged
                      )} red / ${format(fmt)(data.raw.n_at_risk)} amber`;
            },
            title: () => null,
            footer: () => null,
        },
        displayColors: config.dataType === 'continuous',
        ...tooltipAesthetics,
    };
}
