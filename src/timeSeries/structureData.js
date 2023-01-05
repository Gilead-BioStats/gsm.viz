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
        datasets = [
            config.selectedGroupIDs.length > 0
                ? {
                      ...getSelectedGroupLine(data, config, labels),
                      backgroundColor:
                          /at.risk/.test(config.y) && /flagged/.test(config.y)
                              ? '#FD9432'
                              : /at.risk/.test(config.y)
                              ? colorScheme.find((color) =>
                                    color.flag.includes(1)
                                ).color
                              : /flagged/.test(config.y)
                              ? colorScheme.find((color) =>
                                    color.flag.includes(2)
                                ).color
                              : '#aaaaaa',
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
                backgroundColor: 'rgba(0,0,0,.5)',
                borderColor: 'rgba(0,0,0,.5)',
                borderWidth: 3,
            }, // legend item for selected group ID line
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
            }, // legend item for aggregate line
        ];
    }

    // Chart.js data object
    const chartData = {
        labels,
        datasets: datasets.filter((dataset) => dataset !== null),
    };

    return chartData;
}
