import colorScheme from '../../util/colorScheme';

export default function legend(config) {
    const legendOrder = colorScheme
        .sort((a, b) => a.order - b.order)
        .map((color) => color.description);
    legendOrder.unshift('Site Distribution');

    return {
        display: true,
        labels: {
            boxHeight: 5,
            //boxWidth: 10,
            filter: function (legendItem, chartData) {
                return legendItem.text !== '';
            },
            //pointStyleWidth: 10,
            sort: function (a, b, chartData) {
                const order = legendOrder.indexOf(a.text) - legendOrder.indexOf(b.text)

                return (
                    /^Site (?!Distribution)/i.test(a.text) ?  1 :
                    /^Site (?!Distribution)/i.test(b.text) ? -1 : order
                );
            },
            usePointStyle: true,
        },
        onClick: () => null,
        position: 'top',
    };
}
