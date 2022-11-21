import mutate from './structureData/mutate';
import getLabels from './structureData/getLabels';

// datasets
import getSelectedGroupLine from './structureData/selectedGroupLine';
import getAtRisk from './structureData/atRisk';
import getFlagged from './structureData/flagged';
import getAggregateLine from './structureData/aggregateLine';
import getIntervalLines from './structureData/intervalLines';
import getDistribution from './structureData/distribution';

export default function structureData(_data_, config, _ci_) {
    const data = mutate(_data_, config);

    // x-axis labels
    const labels = getLabels(data, config);

    // datasets
    const selectedGroupLine = getSelectedGroupLine(data, config, labels);
    const flagged = getFlagged(data, config, labels);
    const atRisk = getAtRisk(data, config, labels);
    const aggregateLine = getAggregateLine(data, config, labels);
    const intervalLines = getIntervalLines(_ci_, config, labels);
    const distribution = getDistribution(data, config, labels);

    // Chart.js data object
    const chartData = {
        labels,
        datasets: [
            selectedGroupLine,
            flagged,
            atRisk,
            aggregateLine,
            ...intervalLines,
            distribution,
        ].filter((dataset) => dataset !== null),
    };

    return chartData;
}
