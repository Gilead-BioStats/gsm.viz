import { rollups } from 'd3';

export default function structureData(_data_, config, bounds) {
    // Update data.
    const data = _data_
        .map((d) => {
            const datum = {
                groupid: d.groupid,
                x: +d[config.x],
                y: +d[config.y],
                stratum: Math.abs(+d[config.color]),
                metric: +d.metric,
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
                label: `Flag=${group[0].stratum}`,
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
        const lowerBounds = {
            type: 'line',
            data: bounds.map((d) => ({
                x: Math.exp(d.LogExposure),
                y: d.LowerCount,
            })),
            borderColor: config.colors[1],
            pointRadius: 0,
        };

        const upperBounds = {
            type: 'line',
            data: bounds.map((d) => ({
                x: Math.exp(d.LogExposure),
                y: d.UpperCount,
            })),
            borderColor: config.colors[1],
            pointRadius: 0,
        };

        datasets.push(lowerBounds);
        datasets.push(upperBounds);
    }

    return datasets;
}
