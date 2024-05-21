import defineSiteColumns from './defineColumns/defineSiteColumns.js';
import defineWorkflowColumns from './defineColumns/defineWorkflowColumns.js';
import defineTooltip from './structureData/defineTooltip.js';

/**
 * Define column metadata for site overview table. Column metadata includes the following properties:
 * - column label (label)
 * - column data (data)
 * - column key (valueKey)
 * - column sort (sort)
 * - column sort state (sortState)
 *
 * @param {Array} sites - site metadata
 * @param {Array} workflows - workflow metadata
 * @param {Array} results - workflow results
 *
 * @returns {Array} columns
 */
export default function defineColumns(sites, workflows, results) {
    const siteColumns = defineSiteColumns(sites);
    const workflowColumns = defineWorkflowColumns(workflows, results);
    const columns = [
        ...siteColumns,
        ...workflowColumns,
    ];

    columns.forEach((column, i) => {
        column.getDatum = (key) => column.data
            .find(d => d[ column.filterKey ] === key );
        column.index = i;
        column.defineTooltip = defineTooltip;
        column.sortState = 0;
    });

    return columns;
}
