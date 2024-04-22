export default function makeRowData(results, sites, workflows) {
    const lookup = d3.group(
        results,
        d => d.groupid,
        d => d.workflowid
    );

    const rowData = Array.from(lookup, ([key, value]) => {
        let site = sites.find(site => site.siteid === key);

        // Use a default site object if the site is not found.
        if (site === undefined) {
            site = {groupid: key};
        };

        site.key = key;
        site.value = key;
        site.text = key;
        site.type = 'site';
        site.tooltip = true;

        const siteResults = Array.from(value, ([key, value]) => value[0]);
        site.nRedFlags = siteResults.filter(result => Math.abs(parseInt(result.flag)) === 2).length;
        site.nAmberFlags = siteResults.filter(result => Math.abs(parseInt(result.flag)) === 1).length;

        const rowDatum = [
            site,
            {
                key: key,
                value: site.invname,
                text: site.invname,
                type: 'site',
                tooltip: false,
            },
            {
                key: key,
                value: site.status,
                text: site.status,
                type: 'site',
                tooltip: false,
            },
            {
                key: key,
                value: parseInt(site.enrolled_participants),
                text: site.enrolled_participants,
                type: 'site',
                tooltip: false,
            },
            {
                key: key,
                value: site.nRedFlags,
                text: site.nRedFlags,
                type: 'site',
                tooltip: false,
            },
            {
                key: key,
                value: site.nAmberFlags,
                text: site.nAmberFlags,
                type: 'site',
                tooltip: false,
            },
        ];

        for (const workflow of workflows) {
            let cellDatum = value.get(workflow.workflowid);

            // Use a default workflow object if the workflow is not found.
            if (Array.isArray(cellDatum) && cellDatum.length > 0) {
                cellDatum = cellDatum[0];
            } else {
                cellDatum = {flag: 'NA'};
            }

            cellDatum.key = workflow.workflowid;
            cellDatum.value = Math.abs(parseFloat(cellDatum.score));
            cellDatum.text = cellDatum.flag;
            cellDatum.type = 'kri';
            cellDatum.tooltip = true;

            rowDatum.push(cellDatum);
        }

        return rowDatum;
    });

    return rowData;
}
