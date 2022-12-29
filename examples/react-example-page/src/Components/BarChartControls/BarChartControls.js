import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react'
import "./BarChartControls.css"

// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const BarChartControls = ({
    kri,
    setKri,

    params,
    setParams,

    filterThresholds,
    filterResults,
    filterWorkflow,

    instance
}) => {
    // observe KRI dropdown
    const handleKriChange = (event) => {
        setKri(event.target.value);
        console.log(kri); // updated KRI is NOT observed here
    };
  
    useEffect(() => {
        setParams({
            results: filterResults(kri),
            workflow: filterWorkflow(kri),
            thresholds: filterThresholds(kri)
        })
    }, [kri]); //eslint-disable-line

    // observe y-axis dropdown
    const [yaxisToggle, setYaxisToggle] = useState('score');
    const handleYaxisToggleChange = (event) => {
        setYaxisToggle(event.target.value)
    };

    useEffect(() => {
        let workflow = params.workflow
        let current_workflow = { workflow, ...{y: yaxisToggle}}
        setParams({
            results: params.results,
            workflow: current_workflow,
            thresholds: params.thresholds
        })
    }, [yaxisToggle]); //eslint-disable-line -- syntax warning: something about useCallback
  
    // observe threshold toggle
    const [isThreshold, setIsThreshold] = useState(true);
    const handleThresholdCheck = (event) => {
        setIsThreshold(event.target.checked);
    };

    useEffect(() => {
        console.log(isThreshold);
        setParams({
            results: params.results,
            workflow: params.workflow,
            thresholds: isThreshold ? filterThresholds(kri) : null
        })
    }, [isThreshold]); //eslint-disable-line

    return(
        <div className='control-container'>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">KRI</InputLabel>
        <Select
         labelId="demo-simple-select-standard-label"
         id="demo-simple-select-standard"
         value={kri}
         onChange={handleKriChange}
         label="kri"
         >
            <MenuItem value={"kri0001"}>kri0001</MenuItem>
            <MenuItem value={"kri0002"}>kri0002</MenuItem>
            <MenuItem value={"kri0003"}>kri0003</MenuItem>
            <MenuItem value={"kri0004"}>kri0004</MenuItem>
            <MenuItem value={"kri0005"}>kri0005</MenuItem>
            <MenuItem value={"kri0006"}>kri0006</MenuItem>
            <MenuItem value={"kri0007"}>kri0007</MenuItem>
            </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="yaxis-control">Y-Axis</InputLabel>
        <Select
         labelId="yaxis-control-label"
         id="yacis-control-label"
         value={yaxisToggle}
         onChange={handleYaxisToggleChange}
         label="yaxis"
         >
            <MenuItem value={"score"}>score</MenuItem>
            <MenuItem value={"metric"}>metric</MenuItem>
            </Select>
        </FormControl>

        <FormControlLabel 
            control={<Checkbox checked={isThreshold} onChange={handleThresholdCheck} />} 
            label="Threshold" 
        />

        <a href={instance?.toBase64Image()} download={'barchart.png'}>Download</a>
        <Button variant="outlined">Kill</Button>
        </div>
    )
}

export default BarChartControls;