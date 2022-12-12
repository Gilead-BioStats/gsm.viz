import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import "./BarChartControls.css"

const BarChartControls = ({
    kri,
    setKri,
    setWorkflow,
    setResults,
    setParameters,
    parameters,
    workflow,
    filterParameters,
    filterResults,
    setThresholds,
    instance
}) => {

    const changeYaxis = (workflow, yaxis) => {
        workflow.yaxis = yaxis
        return workflow
    }
    
    const [yaxisToggle, setYaxisToggle] = useState('score')
    const [isThreshold, setIsThreshold] = useState(true)

    const handleKriChange = (event: SelectChangeEvent) => {
        setKri(event.target.value);
        setResults(filterResults(kri))
        setParameters(filterParameters(kri))
    };
  
    const handleYaxisToggleChange = (event: SelectChangeEvent) => {
        setYaxisToggle(event.target.value)
        setWorkflow(changeYaxis(workflow, yaxisToggle))
    };
  
    const handleThresholdCheck = (event) => {
        setIsThreshold(event.target.checked);
        !isThreshold ? setThresholds(parameters) : setThresholds(null)
    };


    /*
    const handleDownload = (inst) => {
        console.log(inst)
        const a = document.createElement('a');
        a.href = instance.toBase64Image();
        a.download = 'barchart-plot.png';
        a.click();
    }
    */

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