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
    const tooltipKeys = config.groupTooltipKeys !== undefined
        ? config.groupTooltipKeys
        : Object.keys(content.group).reduce((acc, key) => {
            acc[key] = key;
            return acc;
        }, {});

    const tooltipContent = [];
    for (const [key, label] of Object.entries(tooltipKeys)) {
        if (content[key] !== undefined) {
            let value = content[key];

            tooltipContent.push(`${label}: ${value}`);
        }
    }

    return tooltipContent.join('\n');
}
