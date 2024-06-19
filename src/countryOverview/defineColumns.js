import defineCountryColumns from './defineColumns/defineCountryColumns.js';
import defineWorkflowColumns from './defineColumns/defineWorkflowColumns.js';
import defineTooltip from './defineColumns/defineTooltip.js';

/**
 * Define column metadata for country overview table. Column metadata includes the following properties:
 * - column label (label)
 * - column data (data)
 * - column key (valueKey)
 * - column sort (sort)
 * - column sort state (sortState)
 *
 * @param {Array} countries - country metadata
 * @param {Array} workflows - workflow metadata
 * @param {Array} results - workflow results
 *
 * @returns {Array} columns
 */
export default function defineColumns(countries, workflows, results) {
    const countryColumns = defineCountryColumns(countries);
    const workflowColumns = defineWorkflowColumns(workflows, results);
    const columns = [
        ...countryColumns,
        ...workflowColumns,
    ];

    columns.forEach((column, i) => {
        column.getDatum = (key) => column.data
            .find(d => d[ column.filterKey ] === key );
        column.index = i;
        column.defineTooltip = defineTooltip;
        column.sortState = column.dataType === 'string' ? 0 : 1;
        column.activeSort = false;
    });

    return columns;
}
