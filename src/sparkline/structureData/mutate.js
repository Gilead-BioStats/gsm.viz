import { ascending, rollups } from 'd3';

export default function mutate(_data_, config) {
    let data = _data_
        .map((d) => {
            const datum = {
                ...d,
                //x: +d[config.x],
                y: +d[config.y],
                stratum: Math.abs(+d[config.color]),
            };

            return datum;
        })
        .sort((a, b) => ascending(a.snapshot_date, b.snapshot_date));

    if (['site', 'kri'].includes(config.count)) {
        const N = config.count === 'site'
            ? new Set(data.map(d => d.groupid)).size
            : new Set(data.map(d => d.workflowid)).size;
        data = rollups(
            data,
            snapshot => {
                const n = config.aggregate(snapshot);
                const pct = n/N*100;
                return {
                    n,
                    numerator: n,
                    pct
                };
            },
            d => d.snapshot_date
        ).map(d => {
            d[1].snapshot_date = d[0];
            return d[1];
        });
    }

    return data.slice(data.length - config.nSnapshots);
}
