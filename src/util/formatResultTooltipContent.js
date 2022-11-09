import { format } from 'd3';

export default function formatResultTooltipContent(config, data) {
    console.log(data);
    const datum = data.dataset.data[data.dataIndex];
    const tooltip = [
        `${config.group}: ${datum.groupid}`,
        `KRI Score: ${format('.1f')(datum.score)} (${config.score})`,
        `KRI Value: ${format('.3f')(datum.metric)} (${config.metric})`,
        `${config.numerator}: ${format(',')(datum.numerator)}`,
        `${config.denominator}: ${format(',')(datum.denominator)}`,
    ];

    return tooltip;
}
