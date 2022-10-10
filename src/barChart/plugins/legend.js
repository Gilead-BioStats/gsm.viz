import thresholds from '../../util/colors';

export default function legend(config) {
    //const legendOrder = thresholds.map(threshold => threshold.description);
    return {
        display: false,
        /*
        labels: {
            filter: function (item, chart) {
                return (
                    Math.sign(chart.datasets[item.datasetIndex].flag) !== -1
                );
            },
            sort: function (a, b, chartData) {
                return (
                    legendOrder.indexOf(a.text) -
                    legendOrder.indexOf(b.text)
                );
            },
            position: 'top',
        },
        */
    };
}
