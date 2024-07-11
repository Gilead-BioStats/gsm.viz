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
    const tooltipKeys = ![null, undefined].includes(config.groupTooltipKeys)
        ? config.groupTooltipKeys
        : Object.keys(content.group).reduce((acc, key) => {
            // title-case key:
            // - replace underscores with spaces
            // - insert spaces between camelCase words
            // - capitalize first letter of each word
            // - replace 'Id' with 'ID'
            const label = key
                .replace(/_/g, ' ')
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/\b\w/g, (char) => char.toUpperCase())
                .replace('Id', 'ID');

            acc[key] = label;

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
