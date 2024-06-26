export default function defineTooltip(column, content, metrics = null) {
    let tooltipKeys = {};

    switch (column.type) {
        // Define tooltip content for group columns.
        case 'group':
            tooltipKeys = {
                status: 'Status',
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
