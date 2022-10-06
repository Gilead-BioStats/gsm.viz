import { format } from 'd3';
import thresholds from '../util/colors';

export default function defineBarPlugins(config) {
    //const legendOrder = ['Sites Not Flagged Or At Risk', 'At Risk', 'Flagged'];
    let annotations = config.threshold.map((x, i) => ({
        drawTime: 'beforeDatasetsDraw',
        type: 'line',
        yMin: x.threshold,
        yMax: x.threshold,
        borderColor: thresholds.thresholds.filter((y) =>
            y.flag.includes(+x.flag)
        )[0].color,
        borderWidth: 2,
        borderDash: [5],
        label: {
            rotation: 'auto',
            position: Math.sign(+x.flag) === 1 ? 'end' : 'start',
            color: thresholds.thresholds.filter((y) =>
                y.flag.includes(+x.flag)
            )[0].color,
            backgroundColor: 'white',
            content: thresholds.thresholds.filter((y) =>
                y.flag.includes(+x.flag)
            )[0].description,
            display: true, //Math.sign(+x.flag) === 1,
        },
    }));

    const plugins = {
        tooltip: {
            callbacks: {
                label: (data) => {
                    const datum = data.dataset.data[data.dataIndex];
                    const tooltip = [
                        `${config.xLabel}: ${datum.x}`,
                        `${config.yLabel}: ${format('.3f')(datum.y)}`,
                        `${config.numeratorLabel}: ${datum.numerator}`,
                        `${config.denomionatorLabel}: ${datum.denominator}`,
                        `${config.nLabel}: ${datum.n}`,
                    ];

                    return tooltip;
                },
                title: () => null,
            },
            // events: ['click'],
        },
        annotation: {
            annotations,
        },
        legend: {
            display: false,
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
        },
    };

    return plugins;
}
