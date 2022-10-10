import React from 'react';
import { ScatterPlot, BarChart } from './RbmViz';
import results_summary from './data/results_summary';
import meta_workflow from './data/meta_workflow';
import results_bounds from './data/results_bounds';

const App = () => {
    // const [bondSate, setBondState] = React.useState(BOUNDS);

    // const updateHndler = () => {
    //   const newBond = [...bondSate];
    //   newBond[0].LowerCount = newBond[0].LowerCount === 100 ? 0 : 100;
    //   setBondState(newBond);
    // };

    const WORKFLOW = meta_workflow[0];
    const DATA = results_summary.filter(
        (d) => d.workflowid === WORKFLOW.workflowid
    );
    const BOUNDS = results_bounds.filter(
        (d) => d.workflowid === WORKFLOW.workflowid
    );

    return (
        <>
            {/* <p>welcome</p> */}
            {/* <button onClick={updateHndler}>Update</button> */}
            <ScatterPlot data={DATA} config={WORKFLOW} bounds={BOUNDS} />
            <BarChart data={DATA} config={WORKFLOW} />
        </>
    );
};

export default App;
