import { rollups } from 'd3';

export default function structureBarData(_data_, config) {
    console.log(_data_);
    console.log(config);
    const colors = {
        green: '#52C41A',
        yellow: '#FADB14',
        red: '#FF4D4F',
    };

    // Update data.
    const data = _data_
        .map((d) => {
            const datum = {
                x: d[config.x],
                y: +d[config.y],
                stratum: Math.abs(+d[config.flag]),
                n: d[config.n],
            };

            return datum;
        })
        .sort((a, b) => a.stratum - b.stratum);

    // dummy dataset for legend
    const lineLegend = [
        {
            type: 'line',
            label: 'Flagged Threshold',
            data: [],
            borderColor: colors.red,
        },
        {
            type: 'line',
            label: 'At Risk Threshold',
            data: [],
            borderColor: colors.yellow,
        },
    ];

    const datasets = rollups(
        data,
        (group) => {
            return {
                type: 'bar',
                label: `Flag=${group[0].stratum}`,
                data: group,
            };
        },
        (d) => d.stratum
    ).map((group, i) => {
        const dataset = group[1];
        dataset.backgroundColor =
            group[1].label === 'Flag=0' ? colors.green : colors.red;
        return dataset;
    });
console.log(datasets);
    return [...lineLegend, ...datasets];
}
