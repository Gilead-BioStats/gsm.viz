import { rollups } from 'd3';

/**
 * Given input data, returns an array of arrays Generate a scatter plot built with Chart.js.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _bounds_ - optional auxiliary data plotted as a line representing bounds
 *
 * @returns {Object} Chart.js chart object
 */
export default function structureData(_data_, config, _bounds_) {
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
        .sort((a, b) => {
            const aSelected = config.selectedGroupIDs.indexOf(a.groupid) > -1;
            const bSelected = config.selectedGroupIDs.indexOf(b.groupid) > -1;
            const stratum = b.stratum - a.stratum;

            return aSelected
                ? 1
                : bSelected
                ? -1
                : stratum;
        });
    // TODO: ensure points of greater interest are rendered on top of points of lesser interest
    // TODO: ensure legend displays in the correct order: green > yellow > red
    console.log(new Set(data.map(d => d.stratum)));

    // Stratify dataset in order to apply color scheme.
    const datasets = rollups(
        data,
        (group) => {
            return {
                type: 'scatter',
                stratum: group[0].stratum,
                label:
                    group[0].stratum > 1
                        ? 'Flagged'
                        : group[0].stratum > 0
                        ? 'At risk'
                        : 'Within thresholds',
                data: group,
            };
        },
        (d) => d.stratum
    ).map((group, i) => {
        const dataset = group[1];
        dataset.backgroundColor = config.colors[dataset.stratum];

        return dataset;
    });

    if (_bounds_ !== null) {
        const bounds = rollups(
            _bounds_,
            (group) => {
                return {
                    type: 'line',
                    data: group.map((d) => ({
                        x: Math.exp(+d.x),
                        y: +d.y,
                    })),
                    borderWidth: 1,
                    hoverRadius: 0,
                    pointRadius: 0,
                };
            },
            (d) => d.threshold
        ).map((group, i) => group[1]);

        bounds.forEach((bound, i) => {
            bound.flag = i - Math.floor(bounds.length / 2);
            bound.label = `Bound (Flag = ${bound.flag})`;
            bound.borderColor = config.colors[Math.abs(bound.flag)];
        });

        bounds.forEach((bound) => {
            datasets.push(bound);
        });
    }

    return datasets;
}
