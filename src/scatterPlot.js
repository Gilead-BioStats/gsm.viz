import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import addCanvas from './util/addCanvas';
import configure from './scatterPlot/configure';
import { format, rollups } from 'd3';

export default function scatterPlot(_element_, _data_, _config_ = {}) {
    const canvas = addCanvas(_element_);

    // Update config.
    const config = configure(_config_);

    // Update data.
    const data = _data_
        .map((d) => {
            const datum = {
                groupid: d.groupid,
                x: +d[config.x],
                y: +d[config.y],
                stratum: Math.abs(+d[config.color]),
                metric: +d.metric,
            };

            //datum.backgroundColor = datum.stratum === 0
            //    ? 'lightgray'
            //    : 'red';

            return datum;
        })
        .sort((a, b) => a.stratum - b.stratum);
    console.table(_data_[0]);
    console.table(config);

    console.log(config.color);
    console.log(new Set(data.map((d) => d.stratum)));
    const colors = ['rgba(224,224,224,0.5)', '#d6604d'];

    //
    const datasets = rollups(
        data,
        (group) => {
            return {
                label: `Flag=${group[0].stratum}`,
                data: group,
            };
        },
        (d) => d.stratum
    ).map((group, i) => {
        const dataset = group[1];
        dataset.backgroundColor = colors[i];

        return dataset;
    });
    console.log(datasets);

    const plugins = {
        title: {
            display: true,
            text: `${config.metric} by ${config.group}`,
        },
        tooltip: {
            callbacks: {
                label: (data) => {
                    const datum = data.dataset.data[data.dataIndex];
                    const tooltip = [
                        `${datum.groupid}`,
                        `${format(',d')(datum.y)} ${config.yLabel}`,
                        `${format(',d')(datum.x)} ${config.xLabel}`,
                        `${config.outcome}: ${format('.3f')(datum.metric)}`,
                    ];

                    return tooltip;
                },
            },
        },
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

    const chart = new Chart(canvas, {
        type: 'scatter',
        data: {
            datasets,
        },
        options,
    });

    return chart;
}
