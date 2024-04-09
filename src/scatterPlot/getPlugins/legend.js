import colorScheme from '../../util/colorScheme';

export default function legend(config) {
    const legendOrder = colorScheme
        .sort((a, b) => a.order - b.order)
        .map((color) => color.description);

    return {
        display: config.displayLegend,
        labels: {
            boxHeight: 6,
            filter: function (legendItem, chartData) {
                return legendItem.text !== '';
            },
            sort: function (a, b, chartData) {
                return (
                    legendOrder.indexOf(a.text) - legendOrder.indexOf(b.text)
                );
            },
            usePointStyle: true,
        },
        onClick: () => null,
        position: 'top',
    };
}
