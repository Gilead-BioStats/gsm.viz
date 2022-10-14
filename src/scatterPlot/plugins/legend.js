import colorScheme from '../../util/colorScheme';

export default function legend(config) {
    const legendOrder = colorScheme
        .sort((a, b) => a.order - b.order)
        .map((color) => color.description);

    return {
        display: true,
        labels: {
            boxHeight: 5,
            //boxWidth: 5,
            filter: function (legendItem, chartData) {
                return legendItem.text !== '';
            },
            //pointStyleWidth: 10,
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
