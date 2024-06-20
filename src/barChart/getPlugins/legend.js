// import thresholds from '../../util/colors';

export default function legend(config) {
    //const legendOrder = thresholds.map(threshold => threshold.description);
    return {
        display: true, //!config.thresholds,
        labels: {
            boxHeight: 10,
            boxWidth: 10,
            filter: function (item, chart) {
                return (
                    item.text !== '' // Math.sign(chart.datasets[item.datasetIndex].Flag) !== -1
                );
            },
            //sort: function (a, b, chartData) {
            //    return (
            //        legendOrder.indexOf(a.text) -
            //        legendOrder.indexOf(b.text)
            //    );
            //},
        },
        position: 'top',
    };
}
