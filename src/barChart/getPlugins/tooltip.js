import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

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
                        ? `${config.group} ${datum.groupid} (${datum.site.pi_last_name} / ${datum.site.enrolled_participants} enrolled)`
                        : `${config.group} ${datum.groupid}`;
                }
            },
        },
        ...tooltipAesthetics,
    };
}
