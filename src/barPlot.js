import Chart from 'chart.js/auto';
import addCanvas from './util/addCanvas';
import configure from './barPlot/configure';
import { format, rollups } from 'd3';
import generateLegend from './util/generateLegend';

/**
 * chart.js barchart wrapper function
 * @param  {Node} arg1 HTML element to place plot within
 * @param  {Object} arg2 data to be used in bar chart, categorical x-axis, numeric y-axis
 * @param  {Object} arg3 the configuration for the plot including labels, annotations, colors
 * @returns {Node} responsive barchart inside the delieniated container
 */
export default function barPlot(_element_, _data_, _config_ = {}) {
    const canvas = addCanvas(_element_);

    // Update config.
    const config = configure(_config_);

    const colors = {
        green: '#52C41A',
        yellow: '#FADB14',
        red: '#FF4D4F',
    };

    // Update data.
    const data = _data_
        .map((d) => {
            const datum = {
                x: d[config.x],
                y: +d[config.y],
                stratum: Math.abs(+d[config.color]),
                n: d[config.n],
            };

            return datum;
        })
        .sort((a, b) => a.stratum - b.stratum);

    // dummy dataset for legend
    const lineLegend = [
        {
            type: 'line',
            label: 'Flagged Threshold',
            data: [],
            borderColor: colors.red,
        },
        {
            type: 'line',
            label: 'At Risk Threshold',
            data: [],
            borderColor: colors.yellow,
        },
    ];

    const datasets = rollups(
        data,
        (group) => {
            return {
                type: 'bar',
                label: `Flag=${group[0].stratum}`,
                data: group,
            };
        },
        (d) => d.stratum
    ).map((group, i) => {
        const dataset = group[1];
        dataset.backgroundColor =
            group[1].label === 'Flag=0' ? colors.green : colors.red;
        return dataset;
    });

    console.log(datasets);

    let plugins = {
        tooltip: {
            callbacks: {
                label: (data) => {
                    const datum = data.dataset.data[data.dataIndex];
                    console.log(datum);
                    const tooltip = [
                        `${config.xLabel}: ${datum.x}`,
                        `${config.yLabel}: ${format('.3f')(datum.y)}`,
                    ];

                    return tooltip;
                },
            },
        },
        datalabels: {
            //anchor: "end",
            //align: "top",

            // anchor: "start",
            // align: "bottom",
            anchor: function (context) {
                let y = context.dataset.data[context.dataIndex].y;
                return y < 0 ? 'end' : 'start';
            },
            align: function (context) {
                let y = context.dataset.data[context.dataIndex].y;
                return y < 0 ? 'top' : 'bottom';
            },
            rotation: 90,
            font: {
                weight: 'bold',
            },
            formatter: function (value, ctx) {
                var index = ctx.dataIndex;
                var label = ctx.chart.data.labels[index];
                return label;
            },
        },
        annotation: {
            annotations: {
                line1: {
                    drawTime: 'beforeDatasetsDraw',
                    type: 'line',
                    yMin: 10,
                    yMax: 10,
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [5],
                },
            },
        },
        legend: {
            display: false,
        },
    };

    let scales = {
        x: {
            type: 'category',
            ticks: {
                display: false,
            },
            grid: {
                display: false,
            },
        },
        y: {
            title: {
                display: true,
                text: 'AE Reporting Residual Score',
                /*
            color: "#911",
            font: {
              family: "Comic Sans MS",
              size: 20,
              weight: "bold",
              lineHeight: 1.2,
            },
        */
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
            grid: {
                borderDash: [5],
            },
        },
    };

    const options = {
        plugins,
        scales,
    };

    const customLegend = {
        id: 'customLegend',
        afterDraw(chart, args, options) {
            generateLegend(chart, '.chartBox');
        },
    };

    const chart = new Chart(canvas, {
        data: { datasets: [...lineLegend, ...datasets] },
        options,
        plugins: [customLegend],
    });

    return chart;
}
