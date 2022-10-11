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
        .sort((a, b) => {
            const aSelected = config.selectedGroupIDs.indexOf(a.groupid) > -1;
            const bSelected = config.selectedGroupIDs.indexOf(b.groupid) > -1;
            const stratum = b.stratum - a.stratum;

            return aSelected ? 1 : bSelected ? -1 : stratum;
        });

    return data;
}
