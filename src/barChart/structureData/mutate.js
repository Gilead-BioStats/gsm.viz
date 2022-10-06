export default function mutate(_data_, config) {
    const data = _data_
        .map((d) => {
            const datum = {
                ...d,
                x: d[config.x],
                y: +d[config.y],
                stratum: +d[config.color],
                numerator: +d[config.num],
                denominator: +d[config.denom],
            };

            return datum;
        })
        .sort((a, b) => b.y - a.y);

    return data;
}
