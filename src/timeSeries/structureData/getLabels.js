export default function getLabels(data, config) {
    const labels = [...new Set(data.map((d) => d[config.x]))];

    return labels;
}
