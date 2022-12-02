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

import resultsAll from '../data/results_summary';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const BarChart = ({ data, config, thresholds }) => {
    const container = useRef(null);

    const filterResults = (kri) => {
        return resultsAll.filter(
            (d) => d.workflowid === kri
        )
    }

    const [kri, setKri] = React.useState('kri0001');
    const [results, setResults] = React.useState(filterResults(kri))
    const [yaxis, setYaxis] = React.useState('score')

    const handleKriChange = (event: SelectChangeEvent) => {
      setKri(event.target.value);
      setResults(filterResults(kri))
    };

    const handleYaxisChange = (event: SelectChangeEvent) => {
        setYaxis(event.target.value)
    };

    useEffect(() => {
        if (container.current) {
            rbm.barChart(container.current, results, config, thresholds);
        }
    }, [results, config, thresholds]);
    

    return (
        <div>
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

            <FormControlLabel control={<Checkbox defaultChecked />} label="Threshold" />
            <Button variant="outlined">Download</Button>
            <Button variant="outlined">Kill</Button>

            <div
                ref={container}
                key={generateKey()}
                style={{ width: '100%', height: '25vh', display: 'inline-block' }}
            ></div>
        </div>
    );
};

BarChart.propTypes = {
    //data: PropTypes.array,
    config: PropTypes.object,
    thresholds: PropTypes.array,
};

BarChart.defaultProps = {
    //data: [],
    config: {},
    thresholds: [],
};

export default BarChart;