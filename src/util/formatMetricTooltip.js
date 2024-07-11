import falsy from './falsy.js';

export default function formatMetricTooltip(result, metricMetadata) {
    const tooltipKeys = {
        Score: metricMetadata.Score,
        Metric: metricMetadata.Metric,
        Numerator: metricMetadata.Numerator,
        Denominator: metricMetadata.Denominator,
    };

    const tooltipContent = [];
    for (const [key, label] of Object.entries(tooltipKeys)) {
        if (result[key] !== undefined) {
            let value = result[key];

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

            if (falsy.includes(value))
                value = '—';

            tooltipContent.push(`${label}: ${value}`);
        }
    }

    return tooltipContent;
}
