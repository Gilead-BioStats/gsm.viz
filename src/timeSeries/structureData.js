import mutate from './structureData/mutate';
import getLabels from './structureData/getLabels';

// datasets
import getIdentityLine from './structureData/identityLine';
import getIntervalLines from './structureData/intervalLines';

import getSelectedGroupLine from './structureData/selectedGroupLine';
import getFlagAmber from './structureData/flagAmber';
import getFlagRed from './structureData/flagRed';
import getDistribution from './structureData/distribution';

import getAggregateLine from './structureData/aggregateLine';

import colorScheme from '../util/colorScheme';

export default function structureData(_data_, config, _intervals_) {
    const data = mutate(_data_, config, _intervals_);

    // x-axis labels
    const labels = getLabels(data, config);

    // datasets
    let datasets = [];
    if (config.hasOwnProperty('workflowid') && config.dataType !== 'discrete') {
        if (/^qtl/.test(config.workflowid)) {
            datasets = [
                getIdentityLine(data, config, labels),
                ...getIntervalLines(_intervals_, config, labels),
                {
                    type: 'scatter',
                    label: 'Study Average',
                    pointStyle: 'line',
                    pointStyleWidth: 24,
                    boxWidth: 24,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    borderColor: 'rgba(0,0,0,.25)',
                    borderWidth: 3,
                },
                ...colorScheme.map((color) => ({
                    type: 'bar',
                    label: color.description,
                    backgroundColor: color.color,
                    borderColor: color.color,
                })),
            ];
        } else {
            datasets = [
                getSelectedGroupLine(data, config, labels),
                {
                    type: 'scatter',
                    label:
                        config.selectedGroupIDs.length > 0
                            ? `${config.group} ${config.selectedGroupIDs[0]}`
                            : '',
                    pointStyle: 'line',
                    pointStyleWidth: 24,
                    boxWidth: 24,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    borderColor: 'rgba(0,0,0,.5)',
                    borderWidth: 3,
                },
                ...colorScheme.map((color) => ({
                    type: 'bar',
                    label: !(
                        color.description === 'Within Thresholds' &&
                        config.selectedGroupIDs.length === 0
                    )
                        ? color.description
                        : '',
                    backgroundColor: color.color,
                })),
                getFlagRed(data, config, labels),
                getFlagAmber(data, config, labels),
                getDistribution(data, config, labels),
            ];
        }
    } else if (config.dataType === 'discrete') {
        const color =
            config.yLabel === 'Red or Amber KRIs'
                ? colorScheme.amberRed.color
                : config.yLabel === 'Red KRIs'
                ? colorScheme.find((color) => /red/i.test(color.description))
                      .color
                : config.yLabel === 'Amber KRIs'
                ? colorScheme.find((color) => /amber/i.test(color.description))
                      .color
                : '#1890FF';

        datasets = [
            config.selectedGroupIDs.length > 0
                ? {
                      ...getSelectedGroupLine(data, config, labels),
                      backgroundColor: color,
                      borderColor: (d) => {
                          return d.raw !== undefined ? 'black' : color;
                      },
                  }
                : null,
            {
                type: 'scatter',
                label:
                    config.selectedGroupIDs.length > 0
                        ? `${config.group} ${config.selectedGroupIDs[0]}`
                        : '',
                pointStyle: 'line',
                pointStyleWidth: 24,
                boxWidth: 24,
                backgroundColor: '#1890FF',
                borderColor: (d) => {
                    return d.raw !== undefined ? 'black' : '#1890FF';
                },
                borderWidth: 3,
            },
            getAggregateLine(data, config, labels),
            {
                type: 'scatter',
                label: `${config.aggregateLabel} Average`,
                pointStyle: 'line',
                pointStyleWidth: 24,
                boxWidth: 24,
                backgroundColor: 'rgba(0,0,0,.5)',
                borderColor: 'rgba(0,0,0,.25)',
                borderWidth: 3,
            },
        ];
    }

    // Chart.js data object
    const chartData = {
        labels,
        datasets: datasets.filter((dataset) => dataset !== null),
    };

    return chartData;
}
