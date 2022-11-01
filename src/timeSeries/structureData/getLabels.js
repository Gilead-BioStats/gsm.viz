export default function getLabels(_data_, config) {
    const labels = [
        ...new Set(_data_.map(d => d[config.x]))
    ];

    return labels;
}
