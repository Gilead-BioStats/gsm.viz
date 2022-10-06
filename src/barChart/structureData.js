import mutate from './structureData/mutate';
import scriptableOptions from './structureData/scriptableOptions';

/**
 * Given input data returns an array of arrays, each of which map to one or more graphical elements
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

    const datasets = [
        {
            type: 'bar',
            data,
            ...scriptableOptions(),
        }
    ];

    return datasets;
}
