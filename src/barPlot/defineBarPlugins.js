import { format } from 'd3';
import mapFlagColor from '../util/mapFlagColor';

export default function defineBarPlugins(config) {
    let annotations = config.threshhold.map((x, i) => ({
        drawTime: 'beforeDatasetsDraw',
        type: 'line',
        yMin: x.threshhold,
        yMax: x.threshhold,
        borderColor: mapFlagColor(+x.flag),
        borderWidth: 2,
        borderDash: [5],
    }));

    const plugins = {
        tooltip: {
            callbacks: {
                label: (data) => {
                    const datum = data.dataset.data[data.dataIndex];
                    const tooltip = [
                        `${config.xLabel}: ${datum.x}`,
                        `${config.yLabel}: ${format('.3f')(datum.y)}`,
                        `${config.numeratorLabel}: ${datum.numerator}`,
                        `${config.denomionatorLabel}: ${datum.denominator}`,
                        `${config.nLabel}: ${datum.n}`,
                    ];

                    return tooltip;
                },
                title: () => null,
            },
            // events: ['click'],
        },
        annotation: {
            annotations,
        },
        legend: {
            display: false,
        },
    };

    return plugins;
}
