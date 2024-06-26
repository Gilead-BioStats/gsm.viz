import defineGroupColumns from './defineColumns/defineGroupColumns.js';
import defineWorkflowColumns from './defineColumns/defineWorkflowColumns.js';
import defineTooltip from './defineColumns/defineTooltip.js';

/**
 * Define column metadata for group overview table. Column metadata includes the following properties:
 * - column label (label)
 * - column data (data)
 * - column key (valueKey)
 * - column sort (sort)
 * - column sort state (sortState)
 *
 * @param {Array} groups - group metadata
 * @param {Array} workflows - workflow metadata
 * @param {Array} results - workflow results
 *
 * @returns {Array} columns
 */
export default function defineColumns(groups, workflows, results) {
    const groupColumns = defineGroupColumns(groups);
    const workflowColumns = defineWorkflowColumns(workflows, results);
    const columns = [...groupColumns, ...workflowColumns];

    columns.forEach((column, i) => {
        column.getDatum = (key) =>
            column.data.find((d) => d[column.filterKey] === key);
        column.index = i;
        column.defineTooltip = defineTooltip;
        column.sortState = column.dataType === 'string' ? 0 : 1;
        column.activeSort = false;
    });

    return columns;
}
