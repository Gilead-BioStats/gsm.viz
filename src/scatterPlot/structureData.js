import mutate from './structureData/mutate';
import { rollups } from 'd3';
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

    // Stratify dataset in order to apply color scheme.
    //const datasets = rollups(
    //    data,
    //    (group) => {
    //        return {
    //            type: 'scatter',
    //            stratum: group[0].stratum,
    //            label:
    //                group[0].stratum > 1
    //                    ? 'Flagged'
    //                    : group[0].stratum > 0
    //                    ? 'At risk'
    //                    : 'Within thresholds',
    //            data: group,
    //        };
    //    },
    //    (d) => d.stratum
    //).map((group, i) => {
    //    const dataset = group[1];
    //    dataset.backgroundColor = config.colors[dataset.stratum];

    //    return dataset;
    //});

    const datasets = [
        {
            type: 'scatter',
            data,
            ...scriptableOptions(),
        }
    ];

    const bounds = rollupBounds(_bounds_, config);

    if (bounds !== undefined)
        bounds.forEach((bound) => {
            datasets.push(bound);
        });

    return datasets;
}
