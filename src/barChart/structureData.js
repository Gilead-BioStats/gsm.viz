import mutate from './structureData/mutate.js';
import scriptableOptions from './structureData/scriptableOptions.js';
import colorScheme from '../util/colorScheme.js';

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
    // Modify properties and sort order of data.
    const data = mutate(_data_, config);

    // Define array of Chart.js dataset objects.
    const datasets = [
        {
            type: 'bar',
            data,
            listenClick: true,
            listenHover: true,
            label: '',
            ...scriptableOptions(),
            minBarLength: 2,
            grouped: false,
        },
        ...colorScheme.map((color) => ({
            type: 'bar',
            label: color.description,
            backgroundColor: color.color,
        })),
    ];

    return datasets;
}
