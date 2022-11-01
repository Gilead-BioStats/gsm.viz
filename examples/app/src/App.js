import React from 'react';
import { shuffle } from 'd3';
import { BarChart, ScatterPlot, Sparkline, TimeSeries } from './RbmViz';

import workflows from './data/meta_workflow';
import resultsAll from './data/results_summary';
import boundsAll from './data/results_bounds';
import parametersAll from './data/meta_param';
import resultsOverTimeAll from './data/results_summary_over_time';

const App = () => {
    const workflow = workflows[0];
    //workflow.selectedGroupIDs = '43';
    const results = resultsAll.filter(
        (d) => d.workflowid === workflow.workflowid
    );
    const parameters = parametersAll.filter(
        (d) => d.workflowid === workflow.workflowid
    );
    const bounds = boundsAll.filter(
        (d) => d.workflowid === workflow.workflowid
    );
    const resultsOverTime = resultsOverTimeAll.filter(
        (d) => d.workflowid === workflow.workflowid
    );

    const workflowScoreBars = { ...workflow };
    workflowScoreBars.y = 'score';
    const workflowMetricBars = { ...workflow };
    workflowMetricBars.y = 'metric';
    const workflowScatterPlot = { ...workflow };
    const workflowTimeSeries = { ...workflow };
    const workflowSparkline = { ...workflow };
    workflow.nSnapshots = 25;

    const groupIDs = [...new Set(resultsOverTime.map((d) => d.groupid))].filter(
        () => Math.random() < 0.15
    );
    const sparklines = [];
    for (let i = 0; i < groupIDs.length; i++) {
        const groupID = groupIDs[i];
        const data = resultsOverTime.filter((d) => d.groupid === groupID);
        const sparkline = (
            <Sparkline
                data={shuffle(data).slice(0, 25)}
                config={{ ...workflowSparkline }}
                key={i}
            />
        );
        sparklines.push(sparkline);
    }

    return (
        <>
            {/* <p>welcome</p> */}
            {/* <button onClick={updateHndler}>Update</button> */}
            <BarChart
                data={results}
                config={workflowScoreBars}
                thresholds={parameters}
            />
            <ScatterPlot
                data={results}
                config={workflowScatterPlot}
                bounds={bounds}
            />
            <BarChart
                data={results}
                config={workflowMetricBars}
                thresholds={parameters}
            />
            <TimeSeries
                data={resultsOverTime}
                config={workflowTimeSeries}
                thresholds={parameters}
            />
            {sparklines}
        </>
    );
};

export default App;
