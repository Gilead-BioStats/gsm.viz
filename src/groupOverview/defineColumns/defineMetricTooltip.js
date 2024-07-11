import formatMetricTooltip from '../../util/formatMetricTooltip';
/**
 * Define the content of the tooltip for a given column.
 *
 * @param {Object} column - Column definition.
 * @param {Object} result - Metric result.
 *
 * @returns {String} The tooltip content.
 */
export default function defineTooltip(column, result) {
    const tooltipContent = formatMetricTooltip(result, column.meta);

    return tooltipContent.join('\n');
}
