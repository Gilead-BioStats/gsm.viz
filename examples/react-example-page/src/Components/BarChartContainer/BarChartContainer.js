import BarChart from '../BarChart/BarChart';
import BarChartControls from '../BarChartControls/BarChartControls';
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState } from 'react';

// data
import resultsAll from '../../data/results_summary.json';
import parametersAll from '../../data/meta_param';
import workflows from '../../data/meta_workflow';

import './BarChartContainer.css';

const filterResults = (kri) => {
    return resultsAll.filter((d) => d.workflowid === kri);
};

const filterWorkflow = (kri) => {
    return workflows.find((d) => d.workflowid === kri);
};

const filterThresholds = (kri) => {
    return parametersAll.filter((d) => d.workflowid === kri);
};

const BarChartContainer = () => {
    const [kri, setKri] = useState('kri0001');

    const [params, setParams] = useState({
        results: filterResults(kri),
        workflow: filterWorkflow(kri),
        thresholds: filterThresholds(kri),
    });

    const [instance, setInstance] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('');

    let pseudocode = `rbmViz.scatterPlot(
        document.getElementById(container), 
        data, 
        workflow,
        threshold
    )`;

    return (
        <div className="chart-container">
            <h2 className="chart-title">Bar Chart</h2>
            <div className="chart-grid">
                <div className="chart-left">
                    <BarChartControls
                        allKRIs ={workflows.filter((d) => /^kri/.test(d.workflowid))}
                        kri={kri}
                        setKri={setKri}
                        setParams={setParams}
                        results={params.results}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        filterThresholds={filterThresholds}
                        filterResults={filterResults}
                        filterWorkflow={filterWorkflow}
                        instance={instance}
                    />

                    <BarChart
                        params={params}
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

export default BarChartContainer;
