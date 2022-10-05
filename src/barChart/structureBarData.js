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
        //dataset.backgroundColor = function(d) {
        //    console.log(d);
        //};
        dataset.backgroundColor = thresholds.thresholds.filter((x) =>
            x.flag.includes(group[1].flag)
        )[0].color;
        dataset.barThickness = function (d) {
            return data.length === 25 ? 15 : 3; // 'flex';
        };
        dataset.categoryPercentage = 1;
        dataset.barPercentage = 1;

        return dataset;
    });

    const test = [
        {
            type: 'bar',
            //label: thresholds.thresholds.filter((x) =>
            //    x.flag.includes(group[0].stratum)
            //)[0].description,
            data: data,
            label: 'asdf',
            //flag: group[0].stratum,
            backgroundColor: function (context, options) {
                const data = context.dataset;
                const datum = context.dataset.data[context.dataIndex];

                if (data.type === 'bar') {
                    //console.log(datum);
                    return thresholds.thresholds.find((x) =>
                        x.flag.includes(datum.stratum)
                    ).color;
                    //return this.selectedGroupIDs.includes(datum.groupid)
                    //    ? 'black'
                    //    : 'rgba(0, 0, 0, 0.1)';
                } // else {
                //    return options.color;
                //}
            },
        },
    ];

    return test;
}
