import falsy from '../../util/falsy';

export default function mutate(_data_, config) {
    const data = _data_
        .map((d) => {
            const datum = {
                ...d,
                x: d[config.x],
                y: falsy.includes(d[config.y])
                    ? 0
                    : +d[config.y],
                stratum: falsy.includes(d[config.color])
                    ? 3
                    : Math.abs(+d[config.color]),
            };

            return datum;
        })
        .sort((a, b) => b.y - a.y);

    return data;
}
