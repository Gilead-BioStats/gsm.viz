import formatMetricTooltipLabel from '../../util/formatMetricTooltipLabel';
/**
 * Define the content of the tooltip for a given column.
 *
 * @param {Object} column - Column definition.
 * @param {Object} result - Metric result.
 *
 * @returns {String} The tooltip content.
 */
export default function defineTooltip(column, result) {
    const tooltipContent = formatMetricTooltipLabel(result, column.meta);

    return tooltipContent.join('\n');
}
