import HighlightedSites from '../HighlightedSites/HighlightedSites';
import React, { useEffect, useState } from 'react';
import DownloadChart from '../DownloadChart/DownloadChart';
import './TSDiscreteControls.css';

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
            <HighlightedSites selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} groups={groups}/>
            <DownloadChart instance={instance}/>

            {/* <Button variant="outlined">Kill</Button> */}
        </div>
    );
};

export default TSDiscreteControls;
