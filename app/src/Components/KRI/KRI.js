import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import workflows from '../../data/meta_workflow';


// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const KRI = ({kri, setKri}) => {

    console.log(workflows)

    let allKris = workflows.filter((d) => /^kri|^cou/.test(d.workflowid))
    // observe KRI dropdown
    const handleKriChange = (event) => {
        setKri(event.target.value);
    };

    return (
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
                                {d.metric} by {d.group}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
    );
};

export default KRI;
