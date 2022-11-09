import colorScheme from '../../util/colorScheme';

export default function legend(config) {
    const legendOrder = colorScheme
        .sort((a, b) => a.order - b.order)
        .map((color) => color.description);
    legendOrder.unshift('Site Distribution');

    return {
        display: true,
        labels: {
            boxHeight: /flag|at.risk/.test(config.y) ? 7 : 5,
            boxWidth: 7,
            filter: function (legendItem, chartData) {
                return legendItem.text !== '';
            },
            // TODO: differentiate legend items with generateLabels
            // https://www.chartjs.org/docs/latest/configuration/legend.html#legend-item-interface
            //pointStyleWidth: 3,
            sort: function (a, b, chartData) {
                const order =
                    legendOrder.indexOf(a.text) - legendOrder.indexOf(b.text);

                return /^Site (?!Distribution)/i.test(a.text)
                    ? 1
                    : /^Site (?!Distribution)/i.test(b.text)
                    ? -1
                    : order;
            },
            usePointStyle: /flag|at.risk/.test(config.y) === false,
        },
        onClick: () => null,
        position: 'top',
    };
}
