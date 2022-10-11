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
    const yValues = data.map(d => +d.score);
    const labels = data.map(d => d.snapshot_date);
    const pointBackgroundColor = data.map(d => config.colors[d.stratum]);

    const datasets = [
        {
            type: 'line',
            data: yValues,
            pointBackgroundColor,
            //label: '',
            //...scriptableOptions(),
        },
    ];

    datasets.labels = labels;

    return datasets;
}
