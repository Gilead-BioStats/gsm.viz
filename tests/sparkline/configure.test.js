import results from '../../examples/data/results_summary_over_time.json';
import metrics from '../../examples/data/meta_workflow.json';

import configure from '../../src/sparkline/configure';

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
                'Group',
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

                // sparkline settings
                'x',
                'xType',
                'xLabel',

                'y',
                'yType',
                'yLabel',

                'color',

                'hoverCallback',
                'clickCallback',

                'annotation',
                'chartName',
                'dataType',
                'displayThresholds',
                'maintainAspectRatio',
                'nSnapshots',
                'thresholds',
            ].sort()
        );
    });
});
