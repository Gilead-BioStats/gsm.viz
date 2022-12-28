import data from '../../examples/data/results_summary_over_time.json';
import metadata from '../../examples/data/meta_workflow.json';
import parameters from '../../examples/data/meta_param.json';

import configure from '../../src/timeSeries/configure';

const workflowID = 'kri0001';
const dataSubset = data.filter((d) => d.workflowid === workflowID);
const workflow = metadata.find(
    (workflow) => workflow.workflowid === workflowID
);
const parametersSubset = parameters.filter((d) => d.workflowid === workflowID);

describe('configuration', () => {
    const config = configure(workflow, dataSubset, parametersSubset);

    test('configure() accepts workflow object and returns config object', () => {
        const settings = Object.keys(config).sort();

        expect(settings).toEqual(
            [
                // workflow metadata
                'workflowid',
                'gsm_version',
                'group',
                'abbreviation',
                'metric',
                'numerator',
                'denominator',
                'outcome',
                'model',
                'score',
                'data_inputs',
                'data_filters',
                'gsm_analysis_date',

                // time series settings
                'dataType',
                'discreteUnit',
                'type',
                'tooltipType',

                'x',
                'xType',
                'xLabel',

                'y',
                'yType',
                'yLabel',

                'colorScheme',

                'hoverCallback',
                'clickCallback',

                'aggregateLabel',
                'maintainAspectRatio',

                'selectedGroupIDs',
                'thresholds',
                'variableThresholds',
            ].sort()
        );
    });
});
