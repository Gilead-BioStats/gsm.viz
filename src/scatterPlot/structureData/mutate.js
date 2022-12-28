import { ascending, rollup } from 'd3';

export default function mutate(_data_, config) {
    const data = _data_
        .map((d) => {
            const datum = {
                ...d,
                x: +d[config.x],
                y: +d[config.y],
                //stratum: Math.abs(+d[config.color]),
                stratum: [NaN, null, undefined, ''].includes(+d[config.color])
                    ? 3
                    : Math.abs(+d[config.color]),
            };

            return datum;
        })
        .sort((a, b) => {
            const aSelected = config.selectedGroupIDs.indexOf(a.groupid) > -1;
            const bSelected = config.selectedGroupIDs.indexOf(b.groupid) > -1;
            const stratum = b.stratum - a.stratum;

            return aSelected ? 1 : bSelected ? -1 : stratum;
        });

    const numericGroupIDs = data.every((d) => /^\d+$/.test(d.groupid));

    rollup(
        data,
        (group) => {
            group
                .sort((a, b) => {
                    const selected =
                        config.selectedGroupIDs.includes(b.groupid) -
                        config.selectedGroupIDs.includes(a.groupid);

                    const groupid = numericGroupIDs
                        ? ascending(+a.groupid, +b.groupid)
                        : ascending(a.groupid, b.groupid);

                    return selected !== 0 ? selected : groupid;
                })
                .forEach((d, i) => {
                    d.duplicate = i > 0;
                });
        },
        (d) => d.x,
        (d) => d.y
    );

    return data;
}
