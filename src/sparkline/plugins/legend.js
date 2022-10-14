import colorScheme from '../../util/colorScheme';

export default function legend(config) {
    //const legendOrder = thresholds
    //    .sort((a, b) => a.order - b.order)
    //    .map((threshold) => threshold.description);

    return {
        display: false,
        //labels: {
        //    boxHeight: 1,
        //    filter: function (legendItem, chartData) {
        //        return legendItem.text !== '';
        //    },
        //    sort: function (a, b, chartData) {
        //        return (
        //            legendOrder.indexOf(a.text) - legendOrder.indexOf(b.text)
        //        );
        //    },
        //},
        //position: 'top',
    };
}
