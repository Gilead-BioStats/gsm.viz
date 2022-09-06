import { format } from 'd3';

export default function definePlugins(config) {
    const plugins = {
        title: {
            display: true,
            text: `${config.metric} by ${config.group}`,
        },
        tooltip: {
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
            },
        },
    };

    return plugins;
}
