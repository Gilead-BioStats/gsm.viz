import data from '../../examples/data/results_summary_over_time.json';
import metadata from '../../examples/data/meta_workflow.json';
import parameters from '../../examples/data/meta_param.json';

import configure from '../../src/barChart/configure';

//import structureData from '../../src/barChart/structureData';
//import getScales from '../../src/barChart/getScales';
//import annotations from '../../src/barChart/getPlugins/annotations';
//import legend from '../../src/barChart/getPlugins/legend';
//import tooltip from '../../src/barChart/getPlugins/tooltip';

const workflowID = 'kri0001';
const dataSubset = data.filter((d) => d.MetricID === workflowID);
const workflow = metadata.find((workflow) => workflow.MetricID === workflowID);
const parametersSubset = parameters.filter((d) => d.MetricID === workflowID);

describe('configuration', () => {
    const config = configure(workflow, dataSubset, parametersSubset);

    test('configure() accepts workflow object and returns config object', () => {
        const settings = Object.keys(config).sort();

        expect(settings).toEqual(
            [
                // workflow metadata
                'MetricID',
                'gsm_version',
                'Group',
                'Abbreviation',
                'Metric',
                'Numerator',
                'Denominator',
                'outcome',
                'Model',
                'Score',
                'data_inputs',
                'data_filters',
                'gsm_analysis_date',

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
//    const config = configure(workflow, dataSubset, parametersSubset);
//    const datasets = structureData(dataSubset, config);
//
//    test('structureData returns a dataset with bar data', () => {
//        expect(datasets.filter(dataset => dataset.data !== undefined).length).toBe(1);
//    });
//
//    test('length of bar data matches length of input data', () => {
//        expect(datasets[0].data.length).toBe(dataSubset.length);
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
//        expect(tooltip(configure(workflow, dataSubset, parametersSubset)).callbacks.label).toEqual(
//            expect.any(Function)
//        );
//    });
//
//    test('annotation lines drawn at correct threshholds', () => {
//        expect(annotations(configure(workflow, dataSubset, parametersSubset)).map((x) => x.yMin)).toEqual([
//            7, -7, 5, -5,
//        ]);
//    });
//
//    test('annotation labels left for negative and right for positive', () => {
//        expect(
//            annotations(configure(workflow, dataSubset, parametersSubset)).map((x) => x.label.position)
//        ).toEqual(['end', 'start', 'end', 'start']);
//    });
//
//    test('legend display returns false', () => {
//        expect(legend(configure(workflow, dataSubset, parametersSubset)).display).toBeFalsy();
//    });
//});
//
//describe('getScales test suite', () => {
//    test('x labels not visible for bar graph', () => {
//        expect(getScales(configure(workflow, dataSubset, parametersSubset)).x.ticks.display).toBeFalsy();
//    });
//});
