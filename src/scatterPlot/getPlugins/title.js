/**
 * Define the title of the chart.
 *
 * @param {Object} config - chart configuration and metadata
 *
 * @returns {Object} Title specification.
 */
export default function title(config) {
    return {
        display: config.displayTitle,
        text: `${config.Metric} by ${config.GroupLevel}`,
    };
}
