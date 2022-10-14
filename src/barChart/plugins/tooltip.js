import { format } from 'd3';

export default function tooltip(config) {
    return {
        callbacks: {
            label: (data) => {
                const datum = data.dataset.data[data.dataIndex];
                const tooltip = [
                    `${config.xLabel}: ${datum.x}`,
                    `${config.numeratorLabel}: ${datum.numerator}`,
                    `${config.denominatorLabel}: ${format(',')(datum.denominator)}`,
                    `${config.outcome}: ${format('.3f')(datum.metric)}`,
                    `${config.yLabel}: ${format('.3f')(datum.y)}`,
                    //`${config.nLabel}: ${datum.n}`,
                ];

                return tooltip;
            },
            title: () => null,
        },
        // events: ['click'],
    };
}
