import { format } from 'd3';

export default function tooltip(config) {
    return {
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
    };
}
