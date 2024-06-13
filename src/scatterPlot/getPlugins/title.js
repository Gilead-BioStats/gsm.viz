export default function title(config) {
    return {
        display: config.displayTitle,
        text: `${config.MetricID} by ${config.Group}`,
    };
}
