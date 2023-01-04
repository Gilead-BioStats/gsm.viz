import TSCI from '../TSCI/TSCI'
import TSCIControls from '../TSCIControls/TSCIControls'
import CodeChunk from '../CodeChunk/CodeChunk';
import React, { useState } from 'react';

// data
import resultsAll from "../../data/results_summary_over_time"
import workflows from '../../data/meta_workflow';
import metaAll from '../../data/meta_param';
import analysisAll from "../../data/results_analysis_over_time"

import './TSCIContainer.css';

const filterResults = (qtl) => {
    return resultsAll.filter((d) => /^qtl/.test(d.workflowid))
                     .filter((d) => d.workflowid === qtl);
};

const filterWorkflow = (qtl) => {
    let workflow = workflows.filter((d) => /^qtl/.test(d.workflowid))
                            .find(d => d.workflowid === qtl)
    return {...workflow, ...{y: 'metric'}}
}

const filterMeta = (qtl) => {
    return metaAll.filter((d) => /^kri/.test(d.workflowid))
                  .filter((d) => d.workflowid === qtl)
}

const filterAnalysis = (qtl) => {
    return analysisAll.filter((d) => /^qtl/.test(d.workflowid))
                      .filter((d) => d.workflowid === qtl)
}


const TSContinuousContainer = () => {

    const [qtl, setQtl] = useState('qtl0006');
    const [instance, setInstance] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('43')
    // const [timeSeriesType, setTimeSeriesType] = useState('continuous')

    const [params, setParams] = useState({
        results: filterResults(qtl),
        workflow: filterWorkflow(qtl, selectedGroup),
        parameters : filterMeta(qtl),
        analysis: filterAnalysis(qtl)
    })

    let pseudocode = `rbmViz.timeSeries(
    document.getElementById(container), 
    data, 
    workflow,
    params,
    analysis
)`

    let allQtl = workflows.filter((d) => /^qtl/.test(d.workflowid))
                          .map(x => x.workflowid)
                          .filter(function (x, i, a) {  
                            return a.indexOf(x) === i; 
                         })

    return (
        <div className="chart-container-ts">
            <h2 className="chart-title">Time Series (CI)</h2>
            <div className="chart-grid-ts">

                <div className="chart-left">

                <TSCIControls
                        allQtl={allQtl}
                        qtl={qtl}
                        instance={instance}

                        setQtl={setQtl}
                        setParams={setParams}
                        setSelectedGroup={setSelectedGroup}

                        filterResults={filterResults}
                        filterMeta={filterMeta}
                        filterWorkflow={filterWorkflow}
                        filterAnalysis={filterAnalysis}
                    />
                    
                    <TSCI
                        data={params.results}
                        config={params.workflow}
                        parameters={params.parameters}
                        analysis={params.analysis}
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
