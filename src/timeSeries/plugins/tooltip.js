import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();

    return {
        callbacks: {
            label: formatResultTooltipContent.bind(null, config),
            labelPointStyle: (data) => {
                return {
                    pointStyle: ['line', 'scatter'].includes(data.dataset.type)
                        ? 'circle'
                        : 'rect',
                };
            },
            title: (data) => {
                if (data.length) {
                    const datum = data[0].dataset.data[data[0].dataIndex];

                    return ['boxplot', 'violin'].includes(
                        data[0].dataset.type
                    ) === false && data[0].dataset.purpose !== 'aggregate'
                        ? `${config.group} ${datum.groupid} on ${data[0].label}`
                        : ['boxplot', 'violin'].includes(data[0].dataset.type)
                        ? `${config.group} Distribution on ${data[0].label}`
                        : data[0].dataset.purpose === 'aggregate'
                        ? `${config.group} Summary on ${data[0].label}`
                        : null;
                }
            },
        },
        displayColors: config.dataType !== 'discrete',
        filter: (data) => {
            const datum = data.dataset.data[data.dataIndex];

            // Avoid duplicate display of tooltip.
            return !(
                config.selectedGroupIDs.includes(datum.groupid) &&
                data.dataset.type === 'scatter'
            );
        },
        ...tooltipAesthetics,
    };
}
