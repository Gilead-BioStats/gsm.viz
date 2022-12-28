import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import "./ScatterPlotControls.css"

// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const ScatterPlotControls = ({
    kri,
    instance,

    setKri,
    setWorkflow,
    setResults,
    setBounds,

    filterResults,
    filterBounds,
    filterWorkflow
}) => {

    const [yaxisToggle, setYaxisToggle] = useState('logarithmic')

    // TODO this is running three times?
    console.log(instance)

    // observe KRI dropdown
    const handleKriChange = (event) => {
        setKri(event.target.value);
    };

    // observe y-axis dropdown

    const handleYaxisToggleChange = (event) => {
        setYaxisToggle(event.target.value)
    };

    useEffect(() => {
        setResults(filterResults(kri))
        setWorkflow(filterWorkflow(kri))
        setBounds(filterBounds(kri))
    }, [kri]); // eslint-disable-line


     // change the xaxis title
            if (yaxisToggle === 'linear') {
                instance.config.options.scales.x.title.text = instance.config.options.scales.x.title.text.replace(' (Log Scale)', '')
            } else {
                instance.config.options.scales.x.title.text = instance.config.options.scales.x.title.text + ' (Log Scale)'
            }


    useEffect(() => {
        if (instance !== null) {
            console.log(instance)
            // change the actual scale
            instance.config.options.scales.x.type = yaxisToggle

            //instance.update() 
        }
    }, [yaxisToggle]); // eslint-disable-line


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
        <InputLabel id="yaxis-control">X-Axis Type</InputLabel>
        <Select
         labelId="yaxis-control-label"
         id="yacis-control-label"
         value={yaxisToggle}
         onChange={handleYaxisToggleChange}
         label="yaxis"
         >
            <MenuItem value={"logarithmic"}>log</MenuItem>
            <MenuItem value={"linear"}>linear</MenuItem>
            </Select>
        </FormControl>

        <a href={instance?.toBase64Image()} download={'barchart.png'}>Download</a>
        <Button variant="outlined">Kill</Button>
        </div>
    )

}

export default ScatterPlotControls;
