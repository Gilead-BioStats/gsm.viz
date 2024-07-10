import falsy from '../../util/falsy.js';

export default function mutate(_results_, config, groupMetadata = null) {
    const data = _results_
        .map((d) => {
            // attach group metadata to results
            if (groupMetadata !== null) {
                const group = groupMetadata.get(d.GroupID);

                if (group !== undefined) {
                    d.group = group;
                    d.group.GroupLabel = d.group.hasOwnProperty(config.GroupLabelKey)
                        ? d.group[config.GroupLabelKey]
                        : d.GroupID
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
