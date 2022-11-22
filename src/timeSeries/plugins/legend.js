import colorScheme from '../../util/colorScheme';

export default function legend(config) {
    const legendOrder = colorScheme
        .sort((a, b) => a.order - b.order)
        .map((color) => color.description);
    legendOrder.unshift('Site Distribution');

    if (config.group === 'Study')
        return {
            display: true,
            labels: {
                filter: (legendItem, chartData) => {
                    return legendItem.text !== '';
                },
                generateLabels: (chart) =>
                    chart.data.datasets.map((dataset, i) => {
                        return {
                            //borderDash: [2],
                            //borderWidth: 4,
                            //boxHeight: 6,
                            //boxWidth: 12,
                            datasetIndex: i,
                            fillStyle: dataset.backgroundColor,
                            lineDash: dataset.borderDash,
                            //lineHeight: 6,
                            //lineWidth: 4,
                            pointStyle: dataset.pointStyle,
                            //pointStyleWidth: 24,
                            strokeStyle: dataset.borderColor,
                            text: dataset.label,
                        };
                    }),
                //pointStyleWidth: 3,
                sort: function (a, b, chartData) {
                    const order =
                        legendOrder.indexOf(a.text) -
                        legendOrder.indexOf(b.text);

                    return /^Site (?!Distribution)/i.test(a.text)
                        ? 1
                        : /^Site (?!Distribution)/i.test(b.text)
                        ? -1
                        : order;
                },
                usePointStyle: true, // config.dataType === 'continuous',
            },
            onClick: () => null,
            position: 'top',
        };
    else
        return {
            display: true,
            labels: {
                boxHeight: 6,
                boxWidth: 24,
                filter: (legendItem, chartData) => {
                    return legendItem.text !== '';
                },
                //pointStyleWidth: 3,
                sort: function (a, b, chartData) {
                    const order =
                        legendOrder.indexOf(a.text) -
                        legendOrder.indexOf(b.text);

                    return /^Site (?!Distribution)/i.test(a.text)
                        ? 1
                        : /^Site (?!Distribution)/i.test(b.text)
                        ? -1
                        : order;
                },
                usePointStyle: true, // config.dataType === 'continuous',
            },
            onClick: () => null,
            position: 'top',
        };
}
