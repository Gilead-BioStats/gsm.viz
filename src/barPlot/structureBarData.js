import { rollups } from 'd3';
import colors from '../util/colors';
import mapFlagColor from '../util/mapFlagColor';
import mapFlagLabel from '../util/mapFlagLabel';

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

    if (isChecked) {
        data = data.filter((x) => +x.stratum !== 0);
    }

    // dummy dataset for legend
    const lineLegend = [
        {
            type: 'line',
            label: 'Flagged Threshold',
            data: [],
            borderColor: colors.colors.red,
        },
        {
            type: 'line',
            label: 'At Risk Threshold',
            data: [],
            borderColor: colors.colors.yellow,
        },
    ];

    const datasets = rollups(
        data,
        (group) => {
            return {
                type: 'bar',
                label: mapFlagLabel(group[0].stratum),
                data: group,
                flag: group[0].stratum,
            };
        },
        (d) => d.stratum
    ).map((group, i) => {
        const dataset = group[1];
        dataset.backgroundColor = mapFlagColor(group[1].flag);
        // group[1].label === "Flagged Site" ? colors.colors.red : colors.colors.green;
        return dataset;
    });

    return [...lineLegend, ...datasets];
}
