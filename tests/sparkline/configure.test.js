import data from '../../examples/data/results_summary_over_time.json';
import metadata from '../../examples/data/meta_workflow.json';
import parameters from '../../examples/data/meta_param.json';

import configure from '../../src/sparkline/configure';

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
