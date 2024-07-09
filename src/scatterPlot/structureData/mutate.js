import identifyDuplicatePoints from '../../util/identifyDuplicatePoints.js';

export default function mutate(_results_, config, groupMetadata = null) {
    const results = _results_
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
                x: +d[config.x],
                y: +d[config.y],
                stratum: isNaN(parseFloat(d[config.color]))
                    ? 3
                    : Math.abs(+d[config.color]),
            };

            return datum;
        })
        .sort((a, b) => {
            const aSelected = config.selectedGroupIDs.indexOf(a.GroupID) > -1;
            const bSelected = config.selectedGroupIDs.indexOf(b.GroupID) > -1;
            const stratum = b.stratum - a.stratum;

            return aSelected ? 1 : bSelected ? -1 : stratum;
        });

    identifyDuplicatePoints(results, config);

    return results;
}
