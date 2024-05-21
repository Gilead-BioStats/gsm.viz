import { group } from 'd3';

import defineTooltip from './structureData/defineTooltip';
import sortByFlags from './structureData/sortByFlags';

export default function structureData(results, columns, sites) {
    const lookup = group(
        results,
        (d) => d.groupid,
        (d) => d.workflowid
    );

    const rowData = Array.from(lookup, ([key, value]) => {
        const site = sites.find((site) => site.siteid === key);

        const rowDatum = columns
            .map((column) => {
                const datum = {
                    ...column.getDatum(key) || {},
                    column: column,
                    site: site,
                    siteid: key,
                };

                // TODO: get rid of value or text
                datum.value = datum[column.valueKey];
                datum.text = datum.value;
                // TODO: This is a hack to get the correct sort value for KRI columns.
                datum.sortValue = column.type === 'kri'
                    ? Math.abs(parseFloat(datum.value))
                    : datum.value;
                datum.class = [
                    column.type,
                    column.valueKey,
                ].join(' ');
                datum.tooltip = column.tooltip;
                datum.tooltipContent = defineTooltip(column.type, datum);

                return datum;
            });

        rowDatum.key = key;

        return rowDatum;
    });

    // Sort by # Red Flags, then # Amber Flags, #Green Flags, then Investigator ID;
    // this is the default sort order for the table.
    const sortedData = sortByFlags(rowData);

    return sortedData;
}

//import { group } from 'd3';
//import getSite from './structureData/getSite';
//import countFlags from './structureData/countFlags';
//import defineTooltip from './structureData/defineTooltip';
//import addWorkflows from './structureData/addWorkflows';
//import sortByFlags from './structureData/sortByFlags';
//
//export default function structureData(data, columns, sites, workflows) {
//    const lookup = group(
//        data,
//        (d) => d.groupid,
//        (d) => d.workflowid
//    );
//    console.log(lookup);
//
//    const rowData = Array.from(lookup, ([key, value]) => {
//        const site = getSite(sites, key, value);
//
//        //let site = sites.find((site) => site.siteid === key);
//
//        //// Use a default site object if the site is not found.
//        //if (site === undefined) {
//        //    site = { groupid: key };
//        //}
//
//        //site.key = key;
//        //site.value = key;
//        //site.text = key;
//        //site.type = 'site string tooltip';
//        //site.tooltip = true;
//
//        //// Count flags.
//        //site = countFlags(site, value);
//
//        //site.tooltipContent = defineTooltip('site', site);
//
//        const test = columns
//            .map((column) => {
//                let datum = {
//                    ...column.getDatum(key) || {}
//                };
//
//                datum.column = column;
//                datum.value = datum[column.valueKey];
//                datum.text = datum[column.valueKey];
//                datum.type = [
//                    column.type,
//                    'tooltip'
//                ].join(' ');
//                datum.tooltip = true;
//                //datum.tooltipContent = defineTooltip(column.type, datum);
//
//                return datum;
//            });
//        console.log(test.map(d => d.value));
//
//        let rowDatum = [
//            {
//                key: key,
//                value: site.invname,
//                text: site.invname,
//                type: 'site string',
//                tooltip: false,
//            },
//            site,
//            {
//                key: key,
//                value: parseInt(site.enrolled_participants),
//                text: site.enrolled_participants,
//                type: 'site number',
//                tooltip: false,
//            },
//            {
//                key: key,
//                value: site.nRedFlags,
//                text: site.nRedFlags,
//                type: 'site number',
//                tooltip: false,
//            },
//            {
//                key: key,
//                value: site.nAmberFlags,
//                text: site.nAmberFlags,
//                type: 'site number',
//                tooltip: false,
//            },
//        ];
//
//        // Add a cell for each workflow.
//        rowDatum = addWorkflows(rowDatum, value, workflows);
//        //console.log(rowDatum[1]);
//
//        return rowDatum;
//    });
//
//    // Sort by # Red Flags, then # Amber Flags, then Investigator;
//    // this is the default sort order for the table.
//    const sortedData = sortByFlags(rowData);
//
//    return sortedData;
//}
