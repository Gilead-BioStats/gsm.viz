import ScatterPlot from '../ScatterPlot/ScatterPlot';
import ScatterPlotControls from '../ScatterPlotControls/ScatterPlotControls';
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState } from 'react';

// data
import resultsAll from '../../data/results_summary.json';
import workflows from '../../data/meta_workflow';
import boundsAll from '../../data/results_bounds'

import './ScatterPlotContainer.css';

const filterResults = (kri) => {
    return resultsAll.filter((d) => d.workflowid === kri);
};

const filterWorkflow = (kri) => {
    return workflows.find(d => d.workflowid === kri);
}

const filterBounds = (kri) => {
    return boundsAll.filter((d) => d.workflowid === kri)
}


const ScatterPlotContainer = () => {

    const [kri, setKri] = useState('kri0001');
    const [instance, setInstance] = useState(null);
    const [xAxis, setXaxis] = useState({
        type: 'logarithmic'
    })

    const [params, setParams] = useState({
        results: filterResults(kri),
        workflow: filterWorkflow(kri),
        bounds: filterBounds(kri)
    })


    return (
        <div className="chart-container">
            <h2>Scatter Plot</h2>
            <div className="chart-grid">
                <div className="chart-left">

                        <ScatterPlotControls
                        kri={kri}
                        params={params}
                        instance={instance}

                        setKri={setKri}
                        setParams={setParams}
                        setXaxis={setXaxis}

                        filterResults={filterResults}
                        filterBounds={filterBounds}
                        filterWorkflow={filterWorkflow}
                    />

                    <ScatterPlot
                        data={params.results}
                        config={params.workflow}
                        bounds={params.bounds}
                        xAxis={xAxis}
                        setInstance={setInstance}
                    />
                </div>

                <div className="chart-right">
                    <CodeChunk obj={"rbmViz.scatterPlot('test')"} />
                </div>
            </div>
        </div>
    );
};

export default ScatterPlotContainer;
