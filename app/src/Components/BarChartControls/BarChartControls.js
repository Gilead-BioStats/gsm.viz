import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState, useEffect } from 'react';
import './BarChartControls.css';
import KRI from "../KRI/KRI"
import HighlightedSites from '../HighlightedSites/HighlightedSites';
import DownloadChart from '../DownloadChart/DownloadChart';

const uniqueGroups = (results) => {
    return results
        .map((result) => Math.floor(result.GroupID))
        .filter(function (x, i, a) {
            return a.indexOf(x) === i;
        })
        .sort((a, b) => a - b)
        .map((d) => d + '');
};

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

    instance,
}) => {
    const [yaxisToggle, setYaxisToggle] = useState('score');
    const [isThreshold, setIsThreshold] = useState(true);
    const [groups, setGroups] = useState(uniqueGroups(results));

    useEffect(() => {
        let results = filterResults(kri);

        let workflow = filterWorkflow(kri);
        workflow = { ...workflow, ...{ y: yaxisToggle } };

        let thresholds = isThreshold ? filterThresholds(kri) : null;

        setParams({
            results: results,
            workflow: workflow,
            thresholds: thresholds,
        });

        setGroups(uniqueGroups(results));
    }, [kri, yaxisToggle, isThreshold]); //eslint-disable-line

    // observe y-axis dropdown

    const handleYaxisToggleChange = (event) => {
        setYaxisToggle(event.target.value);
    };

    // observe threshold toggle
    const handleThresholdCheck = (event) => {
        setIsThreshold(event.target.checked);
    };

    return (
        <div className="control-container">
            <KRI kri={kri} setKri={setKri}/>
            <HighlightedSites selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} groups={groups}/>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="yaxis-control">Y-Axis</InputLabel>
                <Select
                    labelId="yaxis-control-label"
                    id="yacis-control-label"
                    value={yaxisToggle}
                    onChange={handleYaxisToggleChange}
                    label="yaxis"
                >
                    <MenuItem value={'score'}>score</MenuItem>
                    <MenuItem value={'metric'}>metric</MenuItem>
                </Select>
            </FormControl>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isThreshold}
                        onChange={handleThresholdCheck}
                    />
                }
                label="Threshold"
            />

            <DownloadChart instance={instance}/>

            {/* <Button variant="outlined">Kill</Button> */}
        </div>
    );
};

export default BarChartControls;
