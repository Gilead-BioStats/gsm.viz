import React from 'react';
import { BarChart, ScatterPlot, Sparkline } from './RbmViz';
import results_summary from './data/results_summary';
import meta_workflow from './data/meta_workflow';
import results_bounds from './data/results_bounds';
import meta_param from './data/meta_param';
import results_summary_over_time from './data/results_summary_over_time';

const App = () => {
    // const [bondSate, setBondState] = React.useState(BOUNDS);

    // const updateHndler = () => {
    //   const newBond = [...bondSate];
    //   newBond[0].LowerCount = newBond[0].LowerCount === 100 ? 0 : 100;
    //   setBondState(newBond);
    // };

    const WORKFLOW = meta_workflow[0];
    WORKFLOW.selectedGroupIDs = ['86'];
    WORKFLOW.nSnapshots = 100;
    const DATA = results_summary.filter(
        (d) => d.workflowid === WORKFLOW.workflowid
    );
    const BOUNDS = results_bounds.filter(
        (d) => d.workflowid === WORKFLOW.workflowid
    );
    const THRESHOLDS = meta_param.filter((d) => d.param === 'vThreshold');
    const LONGITUDINAL = results_summary_over_time
        .filter(d => (
            d.workflowid === WORKFLOW.workflowid &&
            WORKFLOW.selectedGroupIDs.includes(d.groupid)
        ));
console.log(WORKFLOW.selectedGroupIDs);
    return (
        <>
            {/* <p>welcome</p> */}
            {/* <button onClick={updateHndler}>Update</button> */}
            <BarChart data={DATA} config={WORKFLOW} thresholds={THRESHOLDS} />
            <ScatterPlot data={DATA} config={WORKFLOW} bounds={BOUNDS} />
            <Sparkline data={LONGITUDINAL} config={WORKFLOW} />
        </>
    );
};

export default App;
