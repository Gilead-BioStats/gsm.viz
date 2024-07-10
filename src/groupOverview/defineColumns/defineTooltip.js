/**
 * Define the content of the tooltip for a given column. TODO: use config to determine tooltip
 * content. By default use all content.
 *
 * @param {Object} column - The column definition.
 * @param {Object} content - The data content for the column.
 * @param {Object} metrics - The metric metadata.
 *
 * @returns {String} The tooltip content.
 */
export default function defineTooltip(column, content, metrics = null) {
    let tooltipKeys = {};

    switch (column.type) {
        // Define tooltip content for group columns.
        case 'group':
            tooltipKeys = {
                Status: 'Status',

                GroupID: 'Investigator ID',
                InvestigatorLastName: 'Last Name',
                InvestigatorFirstName: 'First Name',

                site_num: 'Site ID',
                account: 'Site',
                City: 'City',
                State: 'State',
                Country: 'Country',

                site_active_dt: 'Activation Date',
                is_satellite: 'Satellite',
            };

            break;
        // Define tooltip content for Metric columns.
        case 'metric':
            tooltipKeys = {
                Score: column.meta.Score,
                Metric: column.meta.Metric,
                Numerator: column.meta.Numerator,
                Denominator: column.meta.Denominator,
            };

            break;
        default:
            tooltipKeys = Object.entries(content);

            break;
    }

    const tooltipContent = [];
    for (const [key, label] of Object.entries(tooltipKeys)) {
        if (content[key] !== undefined) {
            let value = content[key];

            // Format numbers.
            if (column.type === 'metric') {
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
            }

            tooltipContent.push(`${label}: ${value}`);
        }
    }

    return tooltipContent.join('\n');
}
