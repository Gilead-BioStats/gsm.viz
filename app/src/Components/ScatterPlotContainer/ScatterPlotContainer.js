import ScatterPlot from '../ScatterPlot/ScatterPlot';
import ScatterPlotControls from '../ScatterPlotControls/ScatterPlotControls';
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState } from 'react';

// data
import resultsAll from '../../data/results_summary.json';
import workflows from '../../data/meta_workflow';
import boundsAll from '../../data/results_bounds';

import './ScatterPlotContainer.css';

const filterResults = (kri) => {
    return resultsAll.filter((d) => d.workflowid === kri);
};

const filterWorkflow = (kri) => {
    return workflows.find((d) => d.workflowid === kri);
};

const filterBounds = (kri) => {
    return boundsAll.filter((d) => d.workflowid === kri);
};

const ScatterPlotContainer = () => {
    const [kri, setKri] = useState('kri0001');
    const [instance, setInstance] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('43');

    const [xAxis, setXaxis] = useState({
        type: 'logarithmic',
        isLog: true,
    });

    const [params, setParams] = useState({
        results: filterResults(kri),
        workflow: filterWorkflow(kri),
        bounds: filterBounds(kri),
    });

    let pseudocode = `rbmViz.scatterPlot(
        document.getElementById(container), 
        data, 
        workflow,
        bounds
    )`;

    return (
        <div className="chart-container">
            <h2 className="chart-title">Scatter Plot</h2>
            <div className="chart-grid">
                <div className="chart-left">
                    <ScatterPlotControls
                        kri={kri}
                        params={params}
                        instance={instance}
                        results={params.results}
                        selectedGroup={selectedGroup}
                        setKri={setKri}
                        setParams={setParams}
                        setXaxis={setXaxis}
                        setSelectedGroup={setSelectedGroup}
                        filterResults={filterResults}
                        filterBounds={filterBounds}
                        filterWorkflow={filterWorkflow}
                    />

                    <ScatterPlot
                        data={params.results}
                        config={params.workflow}
                        bounds={params.bounds}
                        xAxis={xAxis}
                        selectedGroup={selectedGroup}
                        setInstance={setInstance}
                    />
                </div>

                <div className="chart-right">
                    <CodeChunk obj={pseudocode} />
                </div>
            </div>
        </div>
    );
};

export default ScatterPlotContainer;
