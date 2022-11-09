import { format } from 'd3';

export default function formatResultTooltipContent(config, data) {
    const datum = data.dataset.data[data.dataIndex];
    let content;
    if (['bar', 'line', 'scatter'].includes(data.dataset.type)) {
        content = !config.isCount
            ? [
                  `${config.group}: ${datum.groupid}`,
                  `KRI Score: ${format('.1f')(datum.score)} (${config.score})`,
                  `KRI Value: ${format('.3f')(datum.metric)} (${
                      config.metric
                  })`,
                  `${config.numerator}: ${format(',')(datum.numerator)}`,
                  `${config.denominator}: ${format(',')(datum.denominator)}`,
              ]
            : [
                  `${datum.n_flagged} flagged ${config.unit}${
                      datum.n_flagged === 1 ? '' : 's'
                  }`,
                  `${datum.n_at_risk} at risk ${config.unit}${
                      datum.n_flagged === 1 ? '' : 's'
                  }`,
              ];
    } else if (['boxplot', 'violin'].includes(data.dataset.type)) {
        const stats = ['mean', 'median'].map(
            (stat) =>
                `${stat.charAt(0).toUpperCase()}${stat.slice(1)}: ${
                    data.formattedValue[stat]
                }`
        );
        content = [data.label, ...stats];
    }

    return content;
}
