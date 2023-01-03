import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import "./TSContinuousControls.css"


const uniqueGroups = (results) => {
    return results.map((result) => Math.floor(result.groupid))
                  .filter(function (x, i, a) {  return a.indexOf(x) === i;  })
                  .sort((a, b) =>  a - b)
                  .map(d => d + "")
}

// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const TSContinousCountrols = ({
    kri,
    instance,
    results,
    selectedGroup,

    setKri,
    setParams,
    setSelectedGroup,

    filterResults,
    filterMeta,
    filterWorkflow
}) => {

    const [groups, setGroups] = useState(uniqueGroups(results))

    // observe KRI dropdown
    const handleKriChange = (event) => {
        setKri(event.target.value);
    };

    // observe KRI dropdown
     const handleSiteChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    useEffect(() => {
        setParams({
            results: filterResults(kri),
            workflow: filterWorkflow(kri, selectedGroup),
            parameters: filterMeta(kri)
        })
        // TODO check that this is getting re-rendered
        setGroups(uniqueGroups(results))
    }, [kri, selectedGroup]); // eslint-disable-line

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

        <Button variant="outlined">
            <a href={instance?.toBase64Image()} download={'barchart.png'} style={{textDecoration: 'none', color: 'inherit'}}>Download</a>
        </Button>

        {/* <Button variant="outlined">Kill</Button> */}
        
        </div>
    )

}

export default TSContinousCountrols;
