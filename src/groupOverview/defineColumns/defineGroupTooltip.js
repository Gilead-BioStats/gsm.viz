import formatGroupTooltipLabel from '../../util/formatGroupTooltipLabel';
/**
 * Define the content of the tooltip for a given column. TODO: use config to determine tooltip
 * content. By default use all content.
 *
 * @param {Object} column - The column definition.
 * @param {Object} content - The data content for the column.
 *
 * @returns {String} The tooltip content.
 */
export default function defineTooltip(column, content, config) {
    const tooltipContent = formatGroupTooltipLabel(content.group, config);

    return tooltipContent.join('\n');
}
