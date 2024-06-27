import results from '../../examples/data/results_summary.json';
import metrics from '../../examples/data/meta_workflow.json';
import bounds from '../../examples/data/results_bounds.json';

import configure from '../../src/scatterPlot/configure';

const MetricID = 'kri0001';
const resultsSubset = results.filter((d) => d.MetricID === MetricID);
const metricMetadata = metrics.find((metric) => metric.MetricID === MetricID);
const boundsSubset = bounds.filter((d) => d.MetricID === MetricID);

describe('configuration', () => {
    const config = configure(metricMetadata, resultsSubset);

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

                // scatter plot settings
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

                'chartName',
                'displayLegend',
                'displayTitle',
                'displayTrendLine',
                'maintainAspectRatio',
                'selectedGroupIDs',
            ].sort()
        );
    });
});
