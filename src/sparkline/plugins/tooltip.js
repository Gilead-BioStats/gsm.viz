import { format } from 'd3';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    tooltipAesthetics.padding = 5;

    return {
        callbacks: {
            label: function (data) {
                const fmt =
                    config.y === 'score'
                        ? '.1f'
                        : config.y === 'metric'
                        ? '.3f'
                        : ',d';
                return `${data.label}: ${format(fmt)(data.parsed.y)}`;
            },
            labelPointStyle: () => ({ pointStyle: 'circle' }),
            title: () => null,
        },
        ...tooltipAesthetics,
    };
}
