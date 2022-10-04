import { rollups } from 'd3';
import thresholds from '../util/colors';

export default function structureBarData(_data_, config, isChecked = true) {
    // Update data.
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

    let inliners = 0;
    if (isChecked) {
        inliners = data.length - data.filter((x) => +x.stratum !== 0).length;
        data = data.filter((x) => +x.stratum !== 0);
    }

    // dummy dataset for legend
    /*
    const lineLegend = [
        {
            type: 'line',
            label: 'Flagged Threshold',
            data: [],
            borderColor: thresholds.thresholds[0].color,
        },
        {
            type: 'line',
            label: 'At Risk Threshold',
            data: [],
            borderColor: thresholds.thresholds[1].color,
        },
    ];
    */

    const datasets = rollups(
        data,
        (group) => {
            return {
                type: 'bar',
                label: thresholds.thresholds.filter((x) =>
                    x.flag.includes(group[0].stratum)
                )[0].description,
                data: group,
                flag: group[0].stratum,
            };
        },
        (d) => d.stratum
    ).map((group, i) => {
        const dataset = group[1];
        dataset.backgroundColor = thresholds.thresholds.filter((x) =>
            x.flag.includes(group[1].flag)
        )[0].color;
        return dataset;
    });

    return { data: [...datasets], inliner_count: inliners };
}
