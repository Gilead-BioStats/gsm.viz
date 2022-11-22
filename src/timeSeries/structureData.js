import mutate from './structureData/mutate';
import getLabels from './structureData/getLabels';

// datasets
import getIdentityLine from './structureData/identityLine';
import getIntervalLines from './structureData/intervalLines';

import getSelectedGroupLine from './structureData/selectedGroupLine';
import getAtRisk from './structureData/atRisk';
import getFlagged from './structureData/flagged';
import getDistribution from './structureData/distribution';

import getAggregateLine from './structureData/aggregateLine';

export default function structureData(_data_, config, _intervals_) {
    const data = mutate(_data_, config);

    // x-axis labels
    const labels = getLabels(data, config);

    // datasets
    let datasets = [];
    if (config.hasOwnProperty('workflowid') && config.dataType !== 'discrete') {
        if (/^qtl/.test(config.workflowid)) {
            console.log('qtl');
            datasets = [
                getIdentityLine(data, config, labels),
                ...getIntervalLines(_intervals_, config, labels),
            ];
        } else {
            console.log('kri');
            datasets = [
                getSelectedGroupLine(data, config, labels),
                getFlagged(data, config, labels),
                getAtRisk(data, config, labels),
                getDistribution(data, config, labels),
            ];
        }
    } else if (config.dataType === 'discrete') {
        console.log('discrete');
        datasets = [
            getSelectedGroupLine(data, config, labels),
            getAggregateLine(data, config, labels),
        ];
    }

    // Chart.js data object
    const chartData = {
        labels,
        datasets: datasets.filter((dataset) => dataset !== null),
    };

    return chartData;
}
