import results from '../../examples/data/results_summary_over_time.json';
import metrics from '../../examples/data/meta_workflow.json';

import configure from '../../src/timeSeries/configure.js';

const MetricID = 'kri0001';
const resultsSubset = results.filter((d) => d.MetricID === MetricID);
const metricMetadata = metrics.find((metric) => metric.MetricID === MetricID);
const thresholds = metricMetadata.Thresholds.split(',').map(d => +d);

describe('configuration', () => {
    const config = configure(metricMetadata, resultsSubset, thresholds);

    test('configure() accepts metric metadata object and returns config object', () => {
        const settings = Object.keys(config).sort();

        expect(settings).toEqual(
            [
                // metric metadata
                'MetricID',
                'gsm_version',
                'GroupLevel',
                'Abbreviation',
                'Metric',
                'Numerator',
                'Denominator',
                'Outcome',
                'Model',
                'Score',
                'Thresholds',
                'data_inputs',
                'data_filters',
                'SnapshotDate',

                // time series settings
                'x',
                'xType',
                'xLabel',

                'y',
                'yType',
                'yLabel',

                'color',

                'hoverCallback',
                'hoverCallbackWrapper',
                'clickCallback',
                'clickCallbackWrapper',

                'annotateThreshold',
                'aggregateLabel',
                'chartName',
                'dataType',
                'discreteUnit',
                'distributionDisplay',
                'maintainAspectRatio',
                'selectedGroupIDs',
                'thresholds',
                'variableThresholds',
            ].sort()
        );
    });
});
