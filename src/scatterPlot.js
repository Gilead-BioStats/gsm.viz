import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import addCanvas from './util/addCanvas';
import configure from './scatterPlot/configure';

export default function scatterPlot(
    _element_,
    _data_,
    _config_ = {}
) {
    const canvas = addCanvas(_element_);

    // Update config.
    const config = configure(_config_);

    // Update data.
    const data = _data_
        .map(d => {
            return {
                groupid: d.groupid,
                x: +d[ config.x ],
                y: +d[ config.y ],
                backgroundColor: +d[ config.color ] === 0
                    ? 'lightgray'
                    : 'red',
                metric: +d.metric,
            };
        });
    console.table(_data_[0]);
    console.table(config);

    const chartConfig = {
        datasets: [
            {
                label: `${config.metric} by ${config.group}`,
                data: data,
                backgroundColor: data.map(d => d.backgroundColor)
            }
        ]
    };

    const plugins = {
        tooltip: {
            callbacks: {
                label: data => {
                    const datum = data.dataset.data[data.dataIndex];
                    const tooltip = [
                        `${datum.groupid}`,
                        `${d3.format(',d')(datum.y)} ${config.yLabel}`,
                        `${d3.format(',d')(datum.x)} ${config.xLabel}`,
                        `${config.outcome}: ${d3.format('.3f')(datum.metric)}`
                    ];

                    return tooltip;
                }
            }
        }
    };

    const scales = {
        x: {
            display: true,
            title: {
                display: true,
                text: config.xLabel,
            },
            type: 'logarithmic',
        },
        y: {
            display: true,
            title: {
                display: true,
                text: config.yLabel,
            },
        },
    };

    const options = {
        plugins,
        scales,
    };

    const chart = new Chart(
        canvas,
        {
            type: 'scatter',
            data: chartConfig,
            options
        }
    );

    return chart;
}
