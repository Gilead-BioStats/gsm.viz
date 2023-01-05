import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import './TSCIControls.css';

// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const TSCIControls = ({
    allQtl,
    qtl,
    instance,

    setQtl,
    setParams,

    filterResults,
    filterMeta,
    filterWorkflow,
    filterAnalysis,
}) => {
    // observe KRI dropdown
    const handleQtlChange = (event) => {
        setQtl(event.target.value);
    };

    useEffect(() => {
        setParams({
            results: filterResults(qtl),
            workflow: filterWorkflow(qtl),
            parameters: filterMeta(qtl),
            analysis: filterAnalysis(qtl),
        });
    }, [qtl]); // eslint-disable-line

    return (
        <div className="control-container">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                    QTL
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={qtl}
                    onChange={handleQtlChange}
                    label="qtl"
                >
                    {allQtl.map((d, index) => {
                        return (
                            <MenuItem key={index} value={d.workflowid}>
                                {d.metric}
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

export default TSCIControls;
