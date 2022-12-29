import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react'
import "./BarChartControls.css"

const uniqueGroups = (results) => {
    return results.map((result) => Math.floor(result.groupid))
                  .filter(function (x, i, a) {  return a.indexOf(x) === i;  })
                  .sort((a, b) =>  a - b)
                  .map(d => d + "")
}

// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const BarChartControls = ({
    kri,
    setKri,

    setParams,
    results,

    selectedGroup,
    setSelectedGroup,

    filterThresholds,
    filterResults,
    filterWorkflow,

    instance
}) => {

    const [yaxisToggle, setYaxisToggle] = useState('score');
    const [isThreshold, setIsThreshold] = useState(true);
    const [groups, setGroups] = useState(uniqueGroups(results))

    // observe KRI dropdown
    const handleKriChange = (event) => {
        setKri(event.target.value);
        console.log(kri); // updated KRI is NOT observed here
    };

    // observe KRI dropdown
    const handleSiteChange = (event) => {
        setSelectedGroup(event.target.value);
    };
  
    useEffect(() => {

        let results = filterResults(kri)

        let workflow = filterWorkflow(kri)
        workflow = { workflow, ...{y: yaxisToggle}}

        let thresholds =  isThreshold ? filterThresholds(kri) : null
 
        setParams({
            results: results,
            workflow: workflow,
            thresholds: thresholds
        })

        setGroups(uniqueGroups(results))

    }, [kri, yaxisToggle, isThreshold]); //eslint-disable-line

    // observe y-axis dropdown

    const handleYaxisToggleChange = (event) => {
        setYaxisToggle(event.target.value)
    };

  
    // observe threshold toggle
    const handleThresholdCheck = (event) => {
        setIsThreshold(event.target.checked);
    };

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

        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-standard-label">Highlighted Site</InputLabel>
        <Select
         labelId="highlighted-scatter-site-label"
         id="highlighted-scatter-site"
         value={selectedGroup}
         onChange={handleSiteChange}
         label="kri"
         >
            <MenuItem value=""><em>None</em></MenuItem>
            {
              groups.map((value, index) => {
                return <MenuItem key={index} value={value}>{value}</MenuItem>
              })
            }
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