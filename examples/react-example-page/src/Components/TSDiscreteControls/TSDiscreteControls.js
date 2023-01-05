import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import './TSDiscreteControls.css';

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
const TSDiscreteControls = ({
    instance,
    results,
    selectedGroup,

    setParams,
    setSelectedGroup,

    filterResults,
    filterWorkflow,
}) => {
    const [groups, setGroups] = useState(uniqueGroups(results));

    // observe KRI dropdown
    const handleSiteChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    useEffect(() => {
        setParams({
            results: results,
            workflow: filterWorkflow(selectedGroup),
        });
        // TODO check that this is getting re-rendered
        setGroups(uniqueGroups(results));
    }, [selectedGroup]); // eslint-disable-line

    return (
        <div className="control-container">
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

export default TSDiscreteControls;
