import mutate from './structureData/mutate';
import { group } from 'd3';
import scriptableOptions from './structureData/scriptableOptions';
import rollupBounds from './structureData/rollupBounds';

/**
 * Given input data, returns an array of arrays, each of which map to one or more graphical elements
 * in the visualization.
 *
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} config - chart configuration and metadata
 * @param {Array} _bounds_ - optional auxiliary data plotted as a line representing bounds
 *
 * @returns {Array} data formatted for consumption by Chart.js
 */
export default function structureData(_data_, config, _bounds_) {
    // Update data.
    const data = mutate(_data_, config);

    const datasets = [
        {
            type: 'scatter',
            data,
            label: '',
            ...scriptableOptions(),
        },
    ];

    const bounds = rollupBounds(_bounds_, config);

    if (bounds !== undefined)
        bounds.forEach((bound) => {
            datasets.push(bound);
        });

    return datasets;
}
