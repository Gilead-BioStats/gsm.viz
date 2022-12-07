import { format } from 'd3';

export default function formatResultTooltipContent(config, data) {
    const datum = data.dataset.data[data.dataIndex];

    let content;
    // Handle continuous datum.
    if (
        ['bar', 'line', 'scatter'].includes(data.dataset.type) &&
        config.dataType !== 'discrete'
    ) {
        content =
            config.group === 'Study'
                ? [
                      `${config.yLabel}: ${format('.2f')(datum.metric)}`,
                      `Confidence Interval: (${format('.2f')(
                          datum.lowerCI
                      )}, ${format('.2f')(datum.upperCI)})`,
                      `${config.numerator}: ${format(',')(datum.numerator)}`,
                      `${config.denominator}: ${format(',')(
                          datum.denominator
                      )}`,
                  ]
                : [
                      `KRI Score: ${format('.1f')(datum.score)} (${
                          config.score
                      })`,
                      `KRI Value: ${format('.3f')(datum.metric)} (${
                          config.metric
                      })`,
                      `${config.numerator}: ${format(',')(datum.numerator)}`,
                      `${config.denominator}: ${format(',')(
                          datum.denominator
                      )}`,
                  ];
    }
    // Handle distribution data.
    else if (['boxplot', 'violin'].includes(data.dataset.type)) {
        const stats = ['mean', 'min', 'q1', 'median', 'q3', 'max'].map(
            (stat) =>
                `${stat.charAt(0).toUpperCase()}${stat.slice(1)}: ${format(
                    '.1f'
                )(data.parsed[stat])}`
        );
        content = [...stats];
    }
    // Handle discrete datum/aggregate.
    else if (config.dataType === 'discrete') {
        content =
            data.dataset.purpose === 'highlight'
                ? [
                      `${datum.n_flagged} flagged ${config.discreteUnit}${
                          +datum.n_flagged === 1 ? '' : 's'
                      }`,
                      `${datum.n_at_risk} at risk ${config.discreteUnit}${
                          +datum.n_at_risk === 1 ? '' : 's'
                      }`,
                  ]
                : data.dataset.purpose === 'aggregate' &&
                  config.discreteUnit === 'KRI'
                ? [
                      `${format('.1f')(datum.y)} Average ${config.yLabel}`,
                      ...datum.counts.map(
                          (d) =>
                              `${d[config.y]} ${config.yLabel}: ${d.n}/${
                                  d.N
                              } (${d.pct}%) ${config.group}s`
                      ),
                  ]
                : data.dataset.purpose === 'aggregate' &&
                  config.discreteUnit === 'Site'
                ? `${format('.1f')(datum.y)} ${config.yLabel}` // TODO: display both at risk and flagged
                : null;
    }

    return content;
}
