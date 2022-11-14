import { format } from 'd3';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    tooltipAesthetics.padding = 5;

    return {
        callbacks: {
            label: function (data) {
                return `${data.label}: ${data.formattedValue}`;
            },
            labelPointStyle: () => ({ pointStyle: 'circle' }),
            title: () => null,
        },
        ...tooltipAesthetics,
    };
}
