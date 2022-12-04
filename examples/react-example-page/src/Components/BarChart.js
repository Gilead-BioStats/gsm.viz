import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import "./BarChart.css"

import resultsAll from '../data/results_summary';
import parametersAll from '../data/meta_param';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const BarChart = ({config}) => {

    const container = useRef(null);

    const filterResults = (kri) => {
        return resultsAll.filter(
            (d) => d.workflowid === kri
        )
    }

    const filterParameters = (kri) => {
        return parametersAll.filter((d) => d.workflowid === kri)
    }

    const [kri, setKri] = React.useState('kri0001');
    const [results, setResults] = React.useState(filterResults(kri))
    const [yaxis, setYaxis] = React.useState('score')
    const [isThreshold, setIsThreshold] = React.useState(true)
    const [parameters, setParameters] = React.useState(filterParameters(kri))
    const [thresholds, setThreshold] = React.useState(parameters)
   
    const handleKriChange = (event: SelectChangeEvent) => {
      setKri(event.target.value);
      setResults(filterResults(kri))
      setParameters(filterParameters(kri))
    };

    const handleYaxisChange = (event: SelectChangeEvent) => {
        setYaxis(event.target.value)
    };

    const handleThresholdCheck = (event) => {
        setIsThreshold(event.target.checked);
        !isThreshold ? setThreshold(parameters) : setThreshold(null)
    };
    

    useEffect(() => {
        if (container.current) {
            rbm.barChart(container.current, results, config, thresholds);
        }
    }, [results, config, thresholds]);
    

    return (
        <div className='plotTutorial'>
            <h2>Bar Chart</h2>
            <div className="plot-and-text">
            <div className='plotContainer'>
            <div className='controlContainer'>
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
             value={yaxis}
             onChange={handleYaxisChange}
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

            <Button variant="outlined">Download</Button>
            <Button variant="outlined">Kill</Button>
            </div>
            

            <div
                ref={container}
                key={generateKey()}
                style={{ width: '100%', height: '50vh', display: 'inline-block' }}
            ></div>
        </div>
        <pre className='code'>
            barChart(blah blah)
        </pre>
        </div>
     </div>
    );
};

BarChart.propTypes = {
    //data: PropTypes.array,
    config: PropTypes.object,
    //thresholds: PropTypes.array,
};

BarChart.defaultProps = {
    //data: [],
    config: {},
    //thresholds: [],
};

export default BarChart;