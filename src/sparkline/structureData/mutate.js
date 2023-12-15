import falsy from '../../util/falsy.js';
import { ascending } from 'd3';

export default function mutate(_data_, config) {
    const data = _data_
        .map((d) => {
            const datum = {
                ...d,
                //x: +d[config.x],
                y: +d[config.y],
                stratum: falsy.includes(d[config.color])
                    ? 3
                    : Math.abs(+d[config.color]),
            };

            return datum;
        })
        .sort((a, b) => ascending(a.snapshot_date, b.snapshot_date));

    return data.slice(-config.nSnapshots);
}
