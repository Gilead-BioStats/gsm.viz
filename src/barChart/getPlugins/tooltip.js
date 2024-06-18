import formatResultTooltipContent from '../../util/formatResultTooltipContent.js';
import getTooltipAesthetics from '../../util/getTooltipAesthetics.js';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    tooltipAesthetics.boxWidth = 10;

    return {
        callbacks: {
            label: formatResultTooltipContent.bind(null, config),
            labelPointStyle: () => ({ pointStyle: 'rect' }),
            title: (data) => {
                if (data.length) {
                    const datum = data[0].dataset.data[data[0].dataIndex];

                    return datum.site !== undefined
                        ? `${config.group} ${datum.GroupID} (${datum.site.pi_last_name} / ${datum.site.enrolled_participants} enrolled)`
                        : `${config.group} ${datum.GroupID}`;
                }
            },
        },
        ...tooltipAesthetics,
    };
}
