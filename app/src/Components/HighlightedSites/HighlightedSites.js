import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const HighlightedSites = ({selectedGroup, setSelectedGroup, groups}) => {

    const handleSiteChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    return (
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
    );
};

export default HighlightedSites;
