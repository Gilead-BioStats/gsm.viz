import BarChart from '../BarChart/BarChart';
import BarChartControls from '../BarChartControls/BarChartControls';
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState, useEffect } from 'react';

// data
import resultsAll from '../../data/results_summary.json';
import parametersAll from '../../data/meta_param';
import workflows from '../../data/meta_workflow';

import './BarChartContainer.css';

const BarChartContainer = () => {
    const [kri, setKri] = useState('kri0001');

    const filterResults = (kri) => {
        return resultsAll.filter((d) => d.workflowid === kri);
    };
    
    const filterWorkflow = (kri) => {
        return workflows.find(d => d.workflowid === kri);
    }

    const filterParameters = (kri) => {
        return parametersAll.filter((d) => d.workflowid === kri);
    };

    const [results, setResults] = useState(filterResults(kri));
    const [workflow, setWorkflow] = useState(filterWorkflow(kri));
    const [thresholds, setThresholds] = useState(filterParameters(kri));
    const [instance, setInstance] = useState(null);

    return (
        <div className="chart-container">
            <h2>Bar Chart</h2>
            <div className="chart-grid">
                <div className="chart-left">
                    <BarChartControls
                        kri={kri}
                        setKri={setKri}

                        setResults={setResults}
                        setWorkflow={setWorkflow}
                        setThresholds={setThresholds}

                        results={results}
                        workflow={workflow}
                        thresholds={thresholds}

                        filterParameters={filterParameters}
                        filterResults={filterResults}
                        filterWorkflow={filterWorkflow}

                        instance={instance}
                    />

                    <BarChart
                        data={results}
                        config={workflow}
                        thresholds={thresholds}
                        setInstance={setInstance}
                    />
                </div>

                <div className="chart-right">
                    <CodeChunk obj={"rbmViz.BarChart('test')"} />
                </div>
            </div>
        </div>
    );
};

export default BarChartContainer;
