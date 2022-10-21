import { ascending } from 'd3';

export default function mutate(_data_, config) {
    const data = _data_
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

    //return data
        //.sort((a, b) => Math.random() - Math.random())
        //.slice(0, config.nSnapshots);
    return data.slice(data.length - config.nSnapshots);
}
