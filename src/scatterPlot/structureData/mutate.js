import identifyDuplicatePoints from '../../util/identifyDuplicatePoints.js';

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
                x: +d[config.x],
                y: +d[config.y],
                stratum: isNaN(parseFloat(d[config.color]))
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

    identifyDuplicatePoints(data, config);

    return data;
}
