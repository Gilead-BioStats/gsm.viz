import annotations from './plugins/annotations';

export default function plugins(config) {
    return {
        annotation: {
            annotations: annotations(config),
        },
        legend: {
            display: false,
        },
    };
}
