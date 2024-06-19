import React from 'react';
import { shuffle } from 'd3';

// imports
import findWorkflowID from './data/helpers/findWorkflowID';
import filterWorkflowID from './data/helpers/filterWorkflowID';
import mergeParameters from './data/helpers/mergeParameters';
import { BarChart, ScatterPlot, Sparkline, TimeSeries } from './RbmViz';

// analysis metadata
import workflows from './data/meta_workflow';

// analysis output
import resultsAll from './data/results_summary';
import resultsOverTimeAll from './data/results_summary_over_time';
import resultsPredictedAll from './data/results_bounds';
import resultsVerticalOverTimeAll from './data/results_analysis_over_time';

// analysis parameters
import parametersDefaultAll from './data/meta_param';
import parametersCustomAll from './data/status_param';
import parametersCustomOverTimeAll from './data/status_param_over_time';

// flag counts
import flagCountsByGroupAll from './data/flag_counts_by_group';
import flagCountsByKRIAll from './data/flag_counts_by_kri';

const App = () => {
    const workflowID = 'kri0001';

    // analysis metadata
    const workflow = findWorkflowID(workflows, workflowID);

    // analysis output
    const results = filterWorkflowID(resultsAll, workflowID);
    const resultsOverTime = filterWorkflowID(resultsOverTimeAll, workflowID);
    const resultsPredicted = filterWorkflowID(resultsPredictedAll, workflowID);
    //const resultsVerticalOverTime = filterWorkflowID(resultsVerticalOverTimeAll, workflowID);

    /// analysis parameters
    const parametersDefault = filterWorkflowID(
        parametersDefaultAll,
        workflowID
    );
    const parameters = mergeParameters(
        parametersDefault,
        filterWorkflowID(parametersCustomAll, workflowID)
    );
    const parametersOverTime = mergeParameters(
        parametersDefault,
        filterWorkflowID(parametersCustomOverTimeAll, workflowID)
    );

    // flag counts
    const flagCountsByGroup = flagCountsByGroupAll;
    const flagCountsByKRI = filterWorkflowID(flagCountsByKRIAll, workflowID);

    // configuration
    const barChartScoreConfig = { ...workflow, y: 'Score' };
    const scatterPlotConfig = { ...workflow };
    const barChartMetricConfig = { ...workflow, y: 'Metric' };
    const timeSeriesContinuousConfig = { ...workflow };
    const timeSeriesContinuousWithCIConfig = {
        ...findWorkflowID(workflows, 'qtl0006'),
        y: 'Metric',
    };
    const sparklineConfig = { ...workflow, nSnapshots: 25 };
    const timeSeriesDiscreteByGroupConfig = { y: 'n_at_risk_or_flagged' };
    const timeSeriesDiscreteByKRIConfig = {
        ...workflow,
        y: 'n_at_risk_or_flagged',
    };

    // QTL
    const resultsOverTimeQTL = filterWorkflowID(resultsOverTimeAll, 'qtl0006');
    const parametersOverTimeQTL = mergeParameters(
        filterWorkflowID(parametersDefaultAll, 'qtl0006'),
        filterWorkflowID(parametersCustomOverTimeAll, 'qtl0006')
    );
    const resultsVerticalOverTimeQTL = filterWorkflowID(
        resultsVerticalOverTimeAll,
        'qtl0006'
    );

    // sparklines
    const groupIDs = [...new Set(resultsOverTime.map((d) => d.GroupID))].filter(
        () => Math.random() < 0.15
    );
    const sparklines = [];
    for (let i = 0; i < groupIDs.length; i++) {
        const groupID = groupIDs[i];
        const data = resultsOverTime.filter((d) => d.GroupID === groupID);
        const sparkline = (
            <Sparkline
                data={shuffle(data).slice(0, 25)}
                config={{ ...sparklineConfig }}
                parameters={parameters}
                key={i}
            />
        );
        sparklines.push(sparkline);
    }

    return (
        <>
            <BarChart
                data={results}
                config={barChartScoreConfig}
                thresholds={parameters}
            />
            <ScatterPlot
                data={results}
                config={scatterPlotConfig}
                bounds={resultsPredicted}
            />
            <BarChart
                data={results}
                config={barChartMetricConfig}
                thresholds={parameters}
            />
            <TimeSeries
                data={resultsOverTime}
                config={timeSeriesContinuousConfig}
                thresholds={parametersOverTime}
            />
            <TimeSeries
                data={resultsOverTimeQTL}
                config={timeSeriesContinuousWithCIConfig}
                thresholds={parametersOverTimeQTL}
                intervals={resultsVerticalOverTimeQTL}
            />
            <div>{sparklines}</div>
            <TimeSeries
                data={flagCountsByGroup}
                config={timeSeriesDiscreteByGroupConfig}
                style={{
                    width: '50%',
                    height: '25vw',
                    display: 'inline-block',
                }}
            />
            <TimeSeries
                data={flagCountsByKRI}
                config={timeSeriesDiscreteByKRIConfig}
                style={{
                    width: '50%',
                    height: '25vw',
                    display: 'inline-block',
                }}
            />
        </>
    );
};
export default App;
