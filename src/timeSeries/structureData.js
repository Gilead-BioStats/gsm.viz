import mutate from './structureData/mutate.js';
import getLabels from './structureData/getLabels.js';

// datasets
import getIdentityLine from './structureData/identityLine.js';
import getIntervalLines from './structureData/intervalLines.js';

import getSelectedGroupLine from './structureData/selectedGroupLine.js';
import getFlagAmber from './structureData/flagAmber.js';
import getFlagRed from './structureData/flagRed.js';
import getDistribution from './structureData/distribution.js';

import getThresholdLines from './structureData/getThresholdLines.js';

import getAggregateLine from './structureData/aggregateLine.js';

import colorScheme from '../util/colorScheme.js';

export default function structureData(
    _data_,
    config,
    _thresholds_ = null,
    _intervals_ = null,
    _sites_ = null
) {
    const { data, labels, thresholds, intervals } = mutate(
        _data_,
        config,
        _thresholds_,
        _intervals_,
        _sites_
    );

    // datasets
    let datasets = [];
    if (config.dataType !== 'discrete') {
        // TODO: find a better way to differentiate distribution and CI instances
        if (intervals !== null) {
            datasets = [
                getIdentityLine(data, config, labels),
                ...getIntervalLines(intervals, config, labels),
                {
                    type: 'scatter',
                    label: '',
                    pointStyle: 'line',
                    pointStyleWidth: 24,
                    boxWidth: 24,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    borderColor: 'rgba(0,0,0,.25)',
                    borderWidth: 3,
                },
                ...colorScheme
                    .filter((color) => color.description !== 'No Flag')
                    .map((color) => ({
                        type: 'bar',
                        label: color.description,
                        backgroundColor: color.color,
                        borderColor: color.color,
                    })),
                ...getThresholdLines(thresholds, config, labels),
            ];
        } else {
            datasets = [
                getSelectedGroupLine(data, config, labels),
                {
                    type: 'scatter',
                    label:
                        config.selectedGroupIDs.length > 0
                            ? `${config.GroupLevel} ${config.selectedGroupIDs[0]}`
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
                ...getThresholdLines(thresholds, config, labels),
            ];
        }
    } else if (config.dataType === 'discrete') {
        const color =
            config.yLabel === 'Red or Amber Metrics'
                ? colorScheme.amberRed.color
                : config.yLabel === 'Red Metrics'
                ? colorScheme.find((color) => /red/i.test(color.description))
                      .color
                : config.yLabel === 'Amber Metrics'
                ? colorScheme.find((color) => /amber/i.test(color.description))
                      .color
                : '#1890FF';

        datasets = [
            config.selectedGroupIDs.length > 0
                ? {
                      ...getSelectedGroupLine(data, config, labels),
                      backgroundColor: color,
                      borderColor: (d) => {
                          return d.raw !== undefined ? 'black' : '#aaa';
                      },
                  }
                : null,
            {
                type: 'scatter',
                label:
                    config.selectedGroupIDs.length > 0
                        ? `${config.GroupLevel} ${config.selectedGroupIDs[0]}`
                        : '',
                pointStyle: 'line',
                pointStyleWidth: 24,
                boxWidth: 24,
                backgroundColor: 'rgba(0,0,0,.5)',
                borderColor: 'rgba(0,0,0,.5)',
                borderWidth: 3,
            }, // legend item for selected Group ID line
            getAggregateLine(data, config, labels),
            {
                type: 'scatter',
                label:
                    config.discreteUnit === 'Metric'
                        ? `${config.aggregateLabel} Average`
                        : '',
                pointStyle: 'line',
                pointStyleWidth: 24,
                boxWidth: 24,
                backgroundColor: 'rgba(0,0,0,.5)',
                borderColor: 'rgba(0,0,0,.25)',
                borderWidth: 3,
            }, // legend item for aggregate line
        ];
    }

    datasets = datasets.filter((dataset) => dataset !== null);
    datasets.labels = labels;

    return datasets;
}
