import { format } from 'd3';

export default function tooltip(config) {
    return {
        callbacks: {
            label: function (data) {
                return `${data.label}: ${data.formattedValue}`;
            },
            title: () => null,
        },
    };
}
