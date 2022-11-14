import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();
    return {
        callbacks: {
            displayColors: (asdf) => console.log(asdf),
            label: formatResultTooltipContent.bind(null, config),
            labelPointStyle: () => ({ pointStyle: 'rect' }),
            title: (data) => {
                if (data.length) {
                    const datum = data[0].dataset.data[data[0].dataIndex];

                    return data[0].dataset.type !== 'boxplot'
                        ? `${config.group}: ${datum.groupid}`
                        : `${data[0].label} Distribution`;
                }
            },
        },
        filter: (data) => {
            const datum = data.dataset.data[data.dataIndex];

            return !(
                config.selectedGroupIDs.includes(datum.groupid) &&
                data.dataset.type === 'scatter'
            );
        },
        ...tooltipAesthetics,
    };
}
