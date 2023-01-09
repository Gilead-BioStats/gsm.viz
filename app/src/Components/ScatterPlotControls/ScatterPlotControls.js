import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import KRI from "../KRI/KRI"
import HighlightedSites from '../HighlightedSites/HighlightedSites';
import DownloadChart from '../DownloadChart/DownloadChart';
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
            <KRI kri={kri} setKri={setKri}/>
            <HighlightedSites selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} groups={groups}/>

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

            <DownloadChart instance={instance}/>

            {/* <Button variant="outlined">Kill</Button> */}
        </div>
    );
};

export default ScatterPlotControls;
