import falsy from '../../util/falsy.js';

export default function mutate(_data_, config, _sites_ = null) {
    const data = _data_
        .map((d) => {
            // attach site metadata to results
            if (_sites_ !== null) {
                const site = _sites_.find((site) => site.SiteID === d.GroupID);

                if (site !== undefined) {
                    d.site = site;
                }
            }

            const datum = {
                ...d,
                x: d[config.x],
                y: falsy.includes(d[config.y]) ? 0 : +d[config.y],
                stratum: falsy.includes(d[config.color])
                    ? 3
                    : Math.abs(+d[config.color]),
            };

            return datum;
        })
        .sort((a, b) => b.y - a.y);

    return data;
}
