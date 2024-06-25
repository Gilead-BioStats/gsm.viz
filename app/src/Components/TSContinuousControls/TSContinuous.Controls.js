import React, { useEffect, useState } from 'react';
import KRI from "../KRI/KRI"
import HighlightedSites from '../HighlightedSites/HighlightedSites';
import './TSContinuousControls.css';
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
const TSContinousCountrols = ({
    kri,
    instance,
    results,
    selectedGroup,

    setKri,
    setParams,
    setSelectedGroup,

    filterResults,
    filterMeta,
    filterWorkflow,
}) => {
    
    const [groups, setGroups] = useState(uniqueGroups(results));

    useEffect(() => {
        setParams({
            results: filterResults(kri),
            workflow: filterWorkflow(kri, selectedGroup),
            parameters: filterMeta(kri),
        });
        // TODO check that this is getting re-rendered
        setGroups(uniqueGroups(results));
    }, [kri, selectedGroup]); // eslint-disable-line

    return (
        <div className="control-container">
            <KRI kri={kri} setKri={setKri} />
            <HighlightedSites selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} groups={groups}/>
            <DownloadChart instance={instance}/>

            {/* <Button variant="outlined">Kill</Button> */}
        </div>
    );
};

export default TSContinousCountrols;
