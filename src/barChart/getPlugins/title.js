export default function title(config) {
    return {
        display: config.displayTitle,
        text: `${config.Metric} by ${config.Group}`,
    };
}
