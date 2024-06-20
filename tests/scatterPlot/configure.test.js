import data from '../../examples/data/results_summary.json';
import metadata from '../../examples/data/meta_workflow.json';
import bounds from '../../examples/data/results_summary.json';

import configure from '../../src/scatterPlot/configure';

const workflowID = 'kri0001';
const dataSubset = data.filter((d) => d.MetricID === workflowID);
const workflow = metadata.find((workflow) => workflow.MetricID === workflowID);
const boundsSubset = bounds.filter((d) => d.MetricID === workflowID);

describe('configuration', () => {
    const config = configure(workflow);

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
