import React from 'react';
import { BarChart, ScatterPlot, Sparkline } from './RbmViz';
import results_summary from './data/results_summary';
import meta_workflow from './data/meta_workflow';
import results_bounds from './data/results_bounds';
import meta_param from './data/meta_param';
import results_summary_over_time from './data/results_summary_over_time';

const App = () => {
    // const [bondSate, setBondState] = React.useState(bounds);

    // const updateHndler = () => {
    //   const newBond = [...bondSate];
    //   newBond[0].LowerCount = newBond[0].LowerCount === 100 ? 0 : 100;
    //   setBondState(newBond);
    // };

    const workflow = meta_workflow[0];
    workflow.nSnapshots = 100;
    workflow.y = 'metric'
    const groupIDs = [
        ...new Set(results_summary.map(d => d.groupid))
    ].filter(() => Math.random() < .15);
    workflow.selectedGroupIDs = '86';
    const data = results_summary.filter(
        (d) => d.workflowid === workflow.workflowid && groupIDs.includes(d.groupid)
    );
    const bounds = results_bounds.filter(
        (d) => d.workflowid === workflow.workflowid
    );
    const THRESHOLDS = meta_param.filter((d) => d.param === 'vThreshold');
    const LONGITUDINAL = results_summary_over_time.filter(
        (d) =>
            d.workflowid === workflow.workflowid &&
            workflow.selectedGroupIDs === d.groupid
    );
    return (
        <>
            {/* <p>welcome</p> */}
            {/* <button onClick={updateHndler}>Update</button> */}
            <BarChart data={data} config={workflow} thresholds={THRESHOLDS} />
            <ScatterPlot data={data} config={workflow} bounds={bounds} />
            <Sparkline data={LONGITUDINAL} config={workflow} />
        </>
    );
};

export default App;
