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
    const pointBackgroundColor = data.map((d, i) => {
        return config.dataType === 'continuous'
            ? config.colorScheme[d.stratum].color
            : config.y === 'n_at_risk'
            ? config.colorScheme.find((color) =>
                  /amber/i.test(color.description)
              ).color
            : config.y === 'n_flagged'
            ? config.colorScheme.find((color) => /red/i.test(color.description))
                  .color
            : config.y === 'n_at_risk_or_flagged'
            ? config.colorScheme.amberRed.color
            : '#1890FF';
    });

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
            spanGaps: true,
        },
    ];

    datasets.labels = labels;

    return datasets;
}
