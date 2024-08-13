import formatMetricTooltipLabel from '../../util/formatMetricTooltipLabel.js';
import formatMetricTooltipTitle from '../../util/formatMetricTooltipTitle.js';
import getTooltipAesthetics from '../../util/getTooltipAesthetics.js';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    tooltipAesthetics.boxWidth = 10;

    return {
        callbacks: {
            label: (d) => formatMetricTooltipLabel(d.raw, config),
            labelPointStyle: () => ({ pointStyle: 'rect' }),
            title: (data) => {
                if (data.length) {
                    const datum = data[0].dataset.data[data[0].dataIndex];

                    return formatMetricTooltipTitle(datum, config);
                }
            },
        },
        ...tooltipAesthetics,
    };
}
