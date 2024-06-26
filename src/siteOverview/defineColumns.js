import defineSiteColumns from './defineColumns/defineSiteColumns.js';
import defineMetricColumns from './defineColumns/defineMetricColumns.js';
import defineTooltip from './defineColumns/defineTooltip.js';

/**
 * Define column metadata for site overview table. Column metadata includes the following properties:
 * - column label (label)
 * - column data (data)
 * - column key (valueKey)
 * - column sort (sort)
 * - column sort state (sortState)
 *
 * @param {Array} sites - site metadata
 * @param {Array} metrics - metric metadata
 * @param {Array} results - metric results
 *
 * @returns {Array} columns
 */
export default function defineColumns(sites, metrics, results) {
    const siteColumns = defineSiteColumns(sites);
    const metricColumns = defineMetricColumns(metrics, results);
    const columns = [...siteColumns, ...metricColumns];

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
