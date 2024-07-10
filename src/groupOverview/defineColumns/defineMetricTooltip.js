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
    const tooltipKeys = {
        Score: column.meta.Score,
        Metric: column.meta.Metric,
        Numerator: column.meta.Numerator,
        Denominator: column.meta.Denominator,
    };

    const tooltipContent = [];
    for (const [key, label] of Object.entries(tooltipKeys)) {
        if (content[key] !== undefined) {
            let value = content[key];

            value = parseFloat(value);

            if (Number.isInteger(value)) {
                // format integer with commas
                value = value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                // round float to two decimal places
                value = value.toFixed(2).toString();
            }

            tooltipContent.push(`${label}: ${value}`);
        }
    }

    return tooltipContent.join('\n');
}
