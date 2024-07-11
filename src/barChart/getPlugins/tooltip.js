import formatMetricTooltip from '../../util/formatMetricTooltip.js';
import getTooltipAesthetics from '../../util/getTooltipAesthetics.js';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    tooltipAesthetics.boxWidth = 10;

    return {
        callbacks: {
            label: d => formatMetricTooltip(d.raw, config),
            labelPointStyle: () => ({ pointStyle: 'rect' }),
            title: (data) => {
                if (data.length) {
                    const datum = data[0].dataset.data[data[0].dataIndex];

                    return datum.group !== undefined
                        ? `${config.GroupLevel} ${datum.GroupID} (${datum.group.GroupLabel} / ${datum.group.ParticipantCount} enrolled)`
                        : `${config.GroupLevel} ${datum.GroupID}`;
                }
            },
        },
        ...tooltipAesthetics,
    };
}
