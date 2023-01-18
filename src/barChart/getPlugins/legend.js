export default function legend(config) {
    return {
        display: !config.thresholds,
        labels: {
            boxHeight: 10,
            boxWidth: 10,
            filter: function (item, chart) {
                return (
                    item.text !== ''
                );
            },
        },
        position: 'top',
    };
}
