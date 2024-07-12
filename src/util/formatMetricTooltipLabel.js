import falsy from './falsy.js';

export default function formatMetricTooltipLabel(result, metricMetadata) {
    const tooltipKeys = {
        Score: metricMetadata.Score || 'Score',
        Metric: metricMetadata.Metric || 'Metric',
        Numerator: metricMetadata.Numerator || 'Numerator',
        Denominator: metricMetadata.Denominator || 'Denominator',
    };

    const tooltipLabel = [];
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

            tooltipLabel.push(`${label}: ${value}`);
        }
    }

    return tooltipLabel;
}
