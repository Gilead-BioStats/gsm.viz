import { group } from 'd3';
import mutate from './structureData/mutate.js';
import scriptableOptions from './structureData/scriptableOptions.js';
import rollupBounds from './structureData/rollupBounds.js';
import falsy from '../util/falsy.js';

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
export default function structureData(
    _data_,
    config,
    _bounds_,
    _sites_ = null
) {
    // Modify properties and sort order of data.
    const data = mutate(_data_, config, _sites_);

    // Define array of Chart.js dataset objects.
    const datasets = [
        {
            data,
            label: '',
            listenClick: true,
            listenHover: true,
            type: 'scatter',
            ...scriptableOptions(),
        },
    ];

    // Add predicted bounds dataset objects.
    const bounds = rollupBounds(_bounds_, config);
    if (bounds !== undefined)
        bounds.forEach((bound) => {
            datasets.push(bound);
        });

    // If unevaluable analysis output exists, add an additional dataset object to ensure the
    // corresponding legend item appears.
    if (data.some((d) => falsy.includes(d.flag)))
        datasets.push({
            type: 'line',
            label: 'No Flag',
        });

    return datasets;
}
