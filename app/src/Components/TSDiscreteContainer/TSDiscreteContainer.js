import TSDiscrete from '../TSDiscrete/TSDiscrete';
import TSDiscreteControls from '../TSDiscreteControls/TSDiscreteControls';
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState } from 'react';

// data
import resultsAll from '../../data/flag_counts_by_group';

import './TSDiscreteContainer.css';

const filterResults = () => {
    return resultsAll.map((object) => {
        return {
            ...object,
            n_at_risk_or_flagged: +object.n_at_risk + +object.n_flagged,
        };
    });
};

const filterWorkflow = (selectedGroup) => {
    return { y: 'n_at_risk_or_flagged', selectedGroupIDs: selectedGroup };
};

const TSDiscreteContainer = () => {
    const [instance, setInstance] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('173');

    const [params, setParams] = useState({
        results: filterResults(),
        workflow: filterWorkflow(selectedGroup),
    });

    let pseudocode = `rbmViz.timeSeries(
        document.getElementById(container), 
        data, 
        workflow: {
            y: 'n_at_risk_or_flagged', 
            selectedGroupIDs: selectedGroup
        }
    )`;

    return (
        <div className="chart-container-ts">
            <h2 className="chart-title">Time Series (Discrete)</h2>
            <div className="chart-grid-ts">
                <div className="chart-left">
                    <TSDiscreteControls
                        instance={instance}
                        results={params.results}
                        selectedGroup={selectedGroup}
                        setParams={setParams}
                        setSelectedGroup={setSelectedGroup}
                        filterResults={filterResults}
                        filterWorkflow={filterWorkflow}
                    />

                    <TSDiscrete
                        data={params.results}
                        config={params.workflow}
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

export default TSDiscreteContainer;
