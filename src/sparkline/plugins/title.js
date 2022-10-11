export default function title(config) {
    return {
        display: true,
        text: `${config.metric} by ${config.group}`,
    };
}
