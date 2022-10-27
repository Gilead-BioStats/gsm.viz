import mutate from './structureData/mutate';
import { group } from 'd3';
import scriptableOptions from './structureData/scriptableOptions';

/**
 * Given input data, returns an array of arrays, each of which map to one or more graphical elements
 * in the visualization.
 *
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} config - chart configuration and metadata
 *
 * @returns {Array} data formatted for consumption by Chart.js
 */
export default function structureData(_data_, config) {
    // Update data.
    const data = mutate(_data_, config);
    const labels = data.map((d) => d.snapshot_date);
    const pointBackgroundColor = !isNaN(data[0].stratum)
        ? data.map((d) => config.colorScheme[d.stratum].color)
        : data.map((d,i) => i < data.length - 1
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(0, 0, 0, 0.5)'
        );

    const datasets = [
        {
            type: 'line',
            data: data.map((d, i) => {
                const datum = { ...d };
                datum.x = i;
                datum.y = +d[config.y];

                return datum;
            }),
            pointBackgroundColor,
            //label: '',
            ...scriptableOptions(),
        },
    ];

    datasets.labels = labels;

    return datasets;
}
