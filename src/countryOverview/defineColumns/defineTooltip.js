export default function defineTooltip(column, content, workflows = null) {
    let tooltipKeys = {};

    switch (column.type) {
        // Define tooltip content for country columns.
        case 'country':
            tooltipKeys = {
                status: 'Status',
            };

            break;
        // Define tooltip content for KRI columns.
        case 'kri':
            tooltipKeys = {
                score: column.meta.score,
                metric: column.meta.metric,
                numerator: column.meta.numerator,
                denominator: column.meta.denominator,
            };

            break;
        default:
            console.log(content);
            tooltipKeys = Object.entries(content);

            break;
    }

    const tooltipContent = [];
    for (const [key, label] of Object.entries(tooltipKeys)) {
        if (content[key] !== undefined) {
            let value = content[key];

            // Format numbers.
            if (column.type === 'kri') {
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
