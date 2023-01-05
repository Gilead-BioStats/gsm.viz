import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import './ScatterPlotControls.css';

const uniqueGroups = (results) => {
    return results
        .map((result) => Math.floor(result.groupid))
        .filter(function (x, i, a) {
            return a.indexOf(x) === i;
        })
        .sort((a, b) => a - b)
        .map((d) => d + '');
};

// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const ScatterPlotControls = ({
    allKris,
    kri,
    instance,
    results,
    selectedGroup,

    setKri,
    setParams,
    setXaxis,
    setSelectedGroup,

    filterResults,
    filterBounds,
    filterWorkflow,
}) => {
    const [xaxisToggle, setXaxisToggle] = useState('logarithmic');
    const [groups, setGroups] = useState(uniqueGroups(results));

    // observe KRI dropdown
    const handleKriChange = (event) => {
        setKri(event.target.value);
    };

    // observe KRI dropdown
    const handleSiteChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    // observe y-axis dropdown

    const handleXaxisToggleChange = (event) => {
        setXaxisToggle(event.target.value);
        setXaxis({
            type: event.target.value,
            isLog: event.target.value === 'logarithmic',
        });
    };

    useEffect(() => {
        setParams({
            results: filterResults(kri),
            workflow: filterWorkflow(kri),
            bounds: filterBounds(kri),
        });
        // TODO check that this is getting re-rendered
        setGroups(uniqueGroups(results));
    }, [kri]); // eslint-disable-line

    return (
        <div className="control-container">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                    KRI
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={kri}
                    onChange={handleKriChange}
                    label="kri"
                >
                    {allKris.map((d, index) => {
                        return (
                            <MenuItem key={index} value={d.workflowid}>
                                {d.metric}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                    Highlighted Site
                </InputLabel>
                <Select
                    labelId="highlighted-scatter-site-label"
                    id="highlighted-scatter-site"
                    value={selectedGroup}
                    onChange={handleSiteChange}
                    label="kri"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {groups.map((value, index) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {value}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="yaxis-control">X-Axis Type</InputLabel>
                <Select
                    labelId="xaxis-control-label"
                    id="xaxis-control-label"
                    value={xaxisToggle}
                    onChange={handleXaxisToggleChange}
                    label="yaxis"
                >
                    <MenuItem value={'logarithmic'}>log</MenuItem>
                    <MenuItem value={'linear'}>linear</MenuItem>
                </Select>
            </FormControl>

            <Button variant="outlined">
                <a
                    href={instance?.toBase64Image()}
                    download={'barchart.png'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Download
                </a>
            </Button>

            {/* <Button variant="outlined">Kill</Button> */}
        </div>
    );
};

export default ScatterPlotControls;
