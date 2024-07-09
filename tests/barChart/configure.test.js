import data from '../../examples/data/results_summary.json';
import metadata from '../../examples/data/meta_workflow.json';

import configure from '../../src/barChart/configure.js';

const MetricID = 'kri0001';
const results = data.filter((d) => d.MetricID === MetricID);
const metricMetadata = metadata.find((metric) => metric.MetricID === MetricID);
const thresholds = metricMetadata.Thresholds.split(',').map(d => +d);

describe('configuration', () => {
    const config = configure(metricMetadata, results, thresholds);

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

                // bar chart settings
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
                'displayTitle',
                'maintainAspectRatio',
                'selectedGroupIDs',
                'thresholds',
            ].sort()
        );
    });
});

//describe('data manipulation', () => {
//    const config = configure(metricMetadata, results, parametersSubset);
//    const datasets = structureData(results, config);
//
//    test('structureData returns a dataset with bar data', () => {
//        expect(datasets.filter(dataset => dataset.data !== undefined).length).toBe(1);
//    });
//
//    test('length of bar data matches length of input data', () => {
//        expect(datasets[0].data.length).toBe(results.length);
//    });
//
//    test('structureData formatted for chart.js', () => {
//        expect(Object.keys(dataset[0]).sort()).toEqual(
//            ['type', 'data', 'label', 'backgroundColor'].sort()
//        );
//    });
//
//    test('structureData is type bar', () => {
//        expect(dataset[0].type).toBe('bar');
//    });
//
//    test('structureData is a single dataset with the label asdf', () => {
//        expect(dataset[0].label).toBe('asdf');
//    });
//});

//describe('plugin test suite', () => {
//    test('custom tooltip function', () => {
//        expect(tooltip(configure(metricMetadata, results, parametersSubset)).callbacks.label).toEqual(
//            expect.any(Function)
//        );
//    });
//
//    test('annotation lines drawn at correct threshholds', () => {
//        expect(annotations(configure(metricMetadata, results, parametersSubset)).map((x) => x.yMin)).toEqual([
//            7, -7, 5, -5,
//        ]);
//    });
//
//    test('annotation labels left for negative and right for positive', () => {
//        expect(
//            annotations(configure(metricMetadata, results, parametersSubset)).map((x) => x.label.position)
//        ).toEqual(['end', 'start', 'end', 'start']);
//    });
//
//    test('legend display returns false', () => {
//        expect(legend(configure(metricMetadata, results, parametersSubset)).display).toBeFalsy();
//    });
//});
//
//describe('getScales test suite', () => {
//    test('x labels not visible for bar graph', () => {
//        expect(getScales(configure(metricMetadata, results, parametersSubset)).x.ticks.display).toBeFalsy();
//    });
//});
