import { format } from 'd3';
import falsy from './falsy.js';
import formatMetricTooltipLabel from './formatMetricTooltipLabel.js';

export default function formatResultTooltipContent(data, config) {
    const datum = data.dataset.data[data.dataIndex];

    let content;
    // Handle continuous datum.
    if (
        ['bar', 'line', 'scatter'].includes(data.dataset.type) &&
        config.dataType !== 'discrete'
    ) {
        content =
            config.GroupLevel === 'Study'
                ? [
                      `${config.yLabel}: ${
                          falsy.includes(datum.Metric)
                              ? '—'
                              : format('.3f')(datum.Metric)
                      }`,
                      `Confidence Interval: (${format('.3f')(
                          datum.lowerCI
                      )}, ${format('.3f')(datum.upperCI)})`,
                      `${config.Numerator}: ${format(',')(datum.Numerator)}`,
                      `${config.Denominator}: ${format(',')(
                          datum.Denominator
                      )}`,
                  ]
                : formatMetricTooltipLabel(datum, config);
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
                      `${datum.n_flagged} Red ${config.discreteUnit}${
                          +datum.n_flagged === 1 ? '' : 's'
                      }`,
                      `${datum.n_at_risk} Amber ${config.discreteUnit}${
                          +datum.n_at_risk === 1 ? '' : 's'
                      }`,
                  ]
                : data.dataset.purpose === 'aggregate' &&
                  config.discreteUnit === 'Metric'
                ? [
                      `${format('.1f')(datum.y)} Average ${config.yLabel}`,
                      ...datum.counts.map(
                          (d) =>
                              `${d[config.y]} ${config.yLabel}: ${d.n}/${
                                  d.N
                              } (${d.pct}%) ${config.GroupLevel}s`
                      ),
                  ]
                : data.dataset.purpose === 'aggregate' &&
                  config.discreteUnit === 'Site'
                ? `${format('.1f')(datum.y)} ${config.yLabel}` // TODO: display both amber and red flags
                : null;
    }

    return content;
}
