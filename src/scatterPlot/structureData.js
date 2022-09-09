import { rollups } from 'd3';

/**
 * Given input data, returns an array of arrays Generate a scatter plot built with Chart.js.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} bounds - optional auxiliary data plotted as a line representing bounds
 *
 * @returns {Object} Chart.js chart object
 */
export default function structureData(_data_, config, bounds) {
    // Update data.
    const data = _data_
        .map((d) => {
            const datum = {
                ...d,
                x: +d[config.x],
                y: +d[config.y],
                stratum: Math.abs(+d[config.color]),
            };

            return datum;
        })
        .sort((a, b) => a.stratum - b.stratum);

    // Stratify dataset in order to apply color scheme.
    const datasets = rollups(
        data,
        (group) => {
            return {
                type: 'scatter',
                label: group[0].stratum !== 0 ? 'At risk' : 'Within thresholds', //`Flag=${group[0].stratum}`,
                data: group,
            };
        },
        (d) => d.stratum
    ).map((group, i) => {
        const dataset = group[1];
        dataset.backgroundColor = config.colors[i];

        return dataset;
    });

    if (bounds !== null) {
        const lowerBound = {
            type: 'line',
            data: bounds.map((d) => ({
                x: Math.exp(d.LogExposure),
                y: d.LowerCount,
            })),
            label: 'Lower bound',
            borderColor: config.colors[1],
            borderWidth: 1,
            hoverRadius: 0,
            pointRadius: 0,
        };

        const upperBound = {
            type: 'line',
            data: bounds.map((d) => ({
                x: Math.exp(d.LogExposure),
                y: d.UpperCount,
            })),
            label: 'Upper bound',
            borderColor: config.colors[1],
            borderWidth: 1,
            hoverRadius: 0,
            pointRadius: 0,
        };

        datasets.push(lowerBound);
        datasets.push(upperBound);
    }

    return datasets;
}
