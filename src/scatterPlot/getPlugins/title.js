export default function title(config) {
    return {
        display: config.displayTitle,
        text: `${config.metric} by ${config.group}`,
    };
}
