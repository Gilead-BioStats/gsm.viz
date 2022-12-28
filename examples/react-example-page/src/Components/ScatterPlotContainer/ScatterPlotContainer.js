import ScatterPlot from '../ScatterPlot/ScatterPlot';
import ScatterPlotControls from '../ScatterPlotControls/ScatterPlotControls';
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState } from 'react';

// data
import resultsAll from '../../data/results_summary.json';
import workflows from '../../data/meta_workflow';
import boundsAll from '../../data/results_bounds'

import './ScatterPlotContainer.css';

const ScatterPlotContainer = () => {
    const [kri, setKri] = useState('kri0001');

    const filterResults = (kri) => {
        return resultsAll.filter((d) => d.workflowid === kri);
    };
    
    const filterWorkflow = (kri) => {
        return workflows.find(d => d.workflowid === kri);
    }

    const filterBounds = (kri) => {
        return boundsAll.filter((d) => d.workflowid === kri)
    }

    const [results, setResults] = useState(filterResults(kri));
    const [workflow, setWorkflow] = useState(filterWorkflow(kri));
    const [bounds, setBounds] = useState(filterBounds(kri));
    const [instance, setInstance] = useState(null);
 

    return (
        <div className="chart-container">
            <h2>Scatter Plot</h2>
            <div className="chart-grid">
                <div className="chart-left">

                        <ScatterPlotControls
                        kri={kri}
                        instance={instance}

                        setKri={setKri}
                        setWorkflow={setWorkflow}
                        setResults={setResults}
                        setBounds={setBounds}

                        filterResults={filterResults}
                        filterBounds={filterBounds}
                        filterWorkflow={filterWorkflow}
                    />

                    <ScatterPlot
                        data={results}
                        config={workflow}
                        bounds={bounds}
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
