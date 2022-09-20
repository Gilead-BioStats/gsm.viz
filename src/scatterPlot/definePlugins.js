import { format } from 'd3';

export default function definePlugins(config) {
    const plugins = {
        legend: {
            labels: {
                filter: function (legendItem, chartData) {
                    return !/bound/.test(legendItem.text);
                },
            },
        },
        title: {
            display: true,
            text: `${config.metric} by ${config.group}`,
        },
        tooltip: {
            custom: function (tooltipModel) {
                // EXTENSION: filter is not enough! Hide tooltip frame
                if (!tooltipModel.body || tooltipModel.body.length < 1) {
                    tooltipModel.caretSize = 0;
                    tooltipModel.xPadding = 0;
                    tooltipModel.yPadding = 0;
                    tooltipModel.cornerRadius = 0;
                    tooltipModel.width = 0;
                    tooltipModel.height = 0;
                }
            },
            callbacks: {
                label: (data) => {
                    const datum = data.dataset.data[data.dataIndex];
                    const tooltip = [
                        `${datum.groupid}`,
                        `${format(',d')(datum.y)} ${config.yLabel}`,
                        `${format(',d')(datum.x)} ${config.xLabel}`,
                        `${config.outcome}: ${format('.3f')(datum.metric)}`,
                    ];

                    return tooltip;
                },
                title: () => null,
            },
            events: ['click', 'mouseenter', 'mouseover'],
            filter: (data) => !/bound/.test(data.dataset.label), // turns off tooltip for bounds
        },
    };

    return plugins;
}
