import structureGroupMetadata from '../util/structureGroupMetadata.js';
import mutate from './structureData/mutate.js';
import scriptableOptions from './structureData/scriptableOptions.js';
import colorScheme from '../util/colorScheme.js';

/**
 * Given input data returns an array of arrays, each of which map to one or more graphical elements
 * in the visualization.
 *
 * @param {Array} _results_ - analysis results where each array item is an object of key-value pairs
 * @param {Object} config - chart configuration and metadata
 * @param {Array} _groupMetadata_ - optional group metadata
 *
 * @returns {Array} data formatted for consumption by Chart.js
 */
export default function structureData(
    _results_,
    config,
    _groupMetadata_ = null
) {
    const groupMetadata = structureGroupMetadata(_groupMetadata_, config);

    // Modify properties and sort order of data.
    const data = mutate(_results_, config, groupMetadata);

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
