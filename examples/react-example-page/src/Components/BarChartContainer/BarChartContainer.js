import BarChart from "../BarChart/BarChart"
import BarChartControls from "../BarChartControls/BarChartControls"
import CodeChunk from "../CodeChunk/CodeChunk"
import React, { useState } from 'react'

import resultsAll from '../../data/results_summary.json';
import parametersAll from '../../data/meta_param';
import workflows from "../../data/meta_workflow"

import "./BarChartContainer.css"

// const BarCharContainer
const BarChartContainer = () => {

const filterResults = (kri) => {
    return resultsAll.filter(
        (d) => d.workflowid === kri
    )
}

const filterParameters = (kri) => {
    return parametersAll.filter((d) => d.workflowid === kri)
}

const [kri, setKri] = useState("kri0001")
const [workflow, setWorkflow] = useState({...workflows})
const [results, setResults] = useState(filterResults(kri))
const [parameters, setParameters] = useState(filterParameters(kri))
const [thresholds, setThresholds] = useState(parameters)
const [instance, setInstance] = useState(null)
    
  return (
      <div className="chart-container">
        <h2>Bar Chart</h2>
       <div className="chart-grid">
        <div className="chart-left">
          <BarChartControls 
            kri={kri}
            setKri={setKri}
            setWorkflow={setWorkflow}
            setResults={setResults}
            setParameters={setParameters}
            parameters={parameters}
            workflow={workflow}
            filterParameters={filterParameters}
            filterResults={filterResults}
            setThresholds={setThresholds}
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
          <CodeChunk obj={"rbmVis.BarChar('test')"} />
        </div>
       </div>

      </div>
    );

};

export default BarChartContainer;