import flagCounts from './flagCounts.json';
import groupMetadata from './groupMetadata.json';
import metricMetadata from './metricMetadata.json';
import metricMetadatum from './metricMetadatum.json';
import results from './results.json';
import resultsPredicted from './resultsPredicted.json';
import resultsVertical from './resultsVertical.json';
import snapshotDate from './snapshotDate.json';
import thresholds from './thresholds.json';

metricMetadata.items.properties = metricMetadatum.properties;

const schemata = {
    flagCounts,
    groupMetadata,
    metricMetadata,
    metricMetadatum,
    results,
    resultsPredicted,
    resultsVertical,
    thresholds,
    snapshotDate,
};

export default schemata;
