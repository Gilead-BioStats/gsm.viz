import formatResultTooltipContent from '../../util/formatResultTooltipContent';

export default function tooltip(config) {
    return {
        callbacks: {
            label: formatResultTooltipContent.bind(null, config),
            title: () => null,
        },
    };
}
