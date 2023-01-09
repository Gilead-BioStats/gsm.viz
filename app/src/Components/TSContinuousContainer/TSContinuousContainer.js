import TSContinuous from '../TSContinuous/TSContinuous';
import TSContinuousControls from '../TSContinuousControls/TSContinuous.Controls';
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState } from 'react';

// data
import resultsAll from '../../data/results_summary_over_time';
import workflows from '../../data/meta_workflow';
import metaAll from '../../data/meta_param';

import './TSContinuousContainer.css';

const filterResults = (kri) => {
    return resultsAll
        .filter((d) => /^kri/.test(d.workflowid))
        .filter((d) => d.workflowid === kri);
};

const filterWorkflow = (kri, selectedGroup) => {
    let workflow = workflows
        .filter((d) => /^kri/.test(d.workflowid))
        .find((d) => d.workflowid === kri);
    return {
        ...workflow,
        ...{ type: 'boxplot', selectedGroupIDs: selectedGroup },
    };
};

const filterMeta = (kri) => {
    return metaAll
        .filter((d) => /^kri/.test(d.workflowid))
        .filter((d) => d.workflowid === kri);
};

const TSContinuousContainer = () => {
    const [kri, setKri] = useState('kri0001');
    const [instance, setInstance] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('43');
    // const [timeSeriesType, setTimeSeriesType] = useState('continuous')

    const [params, setParams] = useState({
        results: filterResults(kri),
        workflow: filterWorkflow(kri, selectedGroup),
        parameters: filterMeta(kri),
    });

    let pseudocode = `rbmViz.timeSeries(
    document.getElementById(container), 
    data, 
    workflow,
    params
)`;

    return (
        <div className="chart-container-ts">
            <h2 className="chart-title">Time Series (Continuous)</h2>
            <div className="chart-grid-ts">

                <div className="chart-left">
                    <TSContinuousControls
                        kri={kri}
                        instance={instance}
                        results={params.results}
                        selectedGroup={selectedGroup}
                        setKri={setKri}
                        setParams={setParams}
                        setSelectedGroup={setSelectedGroup}
                        filterResults={filterResults}
                        filterMeta={filterMeta}
                        filterWorkflow={filterWorkflow}
                    />

                    <TSContinuous
                        data={params.results}
                        config={params.workflow}
                        parameters={params.parameters}
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

export default TSContinuousContainer;
