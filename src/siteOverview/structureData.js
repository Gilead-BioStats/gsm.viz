import { group } from 'd3';

export default function structureData(results, sites, workflows) {
    const lookup = group(
        results,
        (d) => d.groupid,
        (d) => d.workflowid
    );

    const rowData = Array.from(lookup, ([key, value]) => {
        let site = sites.find((site) => site.siteid === key);

        // Use a default site object if the site is not found.
        if (site === undefined) {
            site = { groupid: key };
        }

        site.key = key;
        site.value = key;
        site.text = key;
        site.type = 'site string tooltip';
        site.tooltip = true;

        const siteResults = Array.from(value, ([key, value]) => value[0]);
        site.nRedFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 2
        ).length;
        site.nAmberFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 1
        ).length;
        site.nGreenFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 0
        ).length;

        const rowDatum = [
            site,
            {
                key: key,
                value: site.invname,
                text: site.invname,
                type: 'site string',
                tooltip: false,
            },
            //{
            //    key: key,
            //    value: site.status,
            //    text: site.status,
            //    type: 'site string',
            //    tooltip: false,
            //},
            {
                key: key,
                value: parseInt(site.enrolled_participants),
                text: site.enrolled_participants,
                type: 'site number',
                tooltip: false,
            },
            {
                key: key,
                value: site.nRedFlags,
                text: site.nRedFlags,
                type: 'site number',
                tooltip: false,
            },
            {
                key: key,
                value: site.nAmberFlags,
                text: site.nAmberFlags,
                type: 'site number',
                tooltip: false,
            },
        ];

        for (const workflow of workflows) {
            let cellDatum = value.get(workflow.workflowid);

            // Use a default workflow object if the workflow is not found.
            if (Array.isArray(cellDatum) && cellDatum.length > 0) {
                cellDatum = cellDatum[0];
            } else {
                cellDatum = { flag: 'NA' };
            }

            cellDatum.key = workflow.workflowid;
            cellDatum.value = Math.abs(parseFloat(cellDatum.score));
            cellDatum.text = '';
            cellDatum.type = 'kri icon tooltip';
            cellDatum.tooltip = true;

            rowDatum.push(cellDatum);
        }

        return rowDatum;
    });

    // Sort by # Red Flags, then # Amber Flags, then Investigator;
    // this is the default sort order for the table.
    const sortedData = rowData
        .sort((a, b) => {
            const redComparison = b[0].nRedFlags - a[0].nRedFlags;
            const amberComparison = b[0].nAmberFlags - a[0].nAmberFlags;
            const greenComparison = b[0].nGreenFlags - a[0].nGreenFlags;
            const siteComparison = a[0].value.localeCompare(b[0].value);

            return redComparison || amberComparison || greenComparison || siteComparison;
        });

    return sortedData;
}
