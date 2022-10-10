import { rollups } from 'd3';
import thresholds from '../util/colors';

export default function structureBarData(_data_, config, isChecked = true) {
    // Update data.
    console.log(_data_);
    let data = _data_
        .map((d) => {
            const datum = {
                ...d,
                x: d[config.x],
                y: +d[config.y],
                stratum: +d[config.color],
                n: +d[config.n],
                numerator: +d[config.num],
                denominator: +d[config.denom],
            };

            return datum;
        })
        .sort((a, b) => b.y - a.y);

    const datasets = [
        {
            type: 'bar',
            data: data,
            label: 'asdf',
            backgroundColor: function (context, options) {
                const data = context.dataset;
                const datum = context.dataset.data[context.dataIndex];

                if (data.type === 'bar') {
                    //console.log(datum);
                    return config.selectedGroupIDs.includes(datum.groupid)
                        ? 'black'
                        : thresholds.thresholds.find((x) =>
                              x.flag.includes(datum.stratum)
                          ).color;
                }
            },
        },
    ];

    console.log('datasets');
    console.log(datasets);
    return datasets;
}
