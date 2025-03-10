export default function checkSelectedGroupIDs(selectedGroupIDs, _data_) {
    // empty string, null, undefined, empty array
    if (
        ['', null, undefined].includes(selectedGroupIDs) ||
        (Array.isArray(selectedGroupIDs) && selectedGroupIDs.length === 0)
    )
        return [];

    // coerce to array
    if (!Array.isArray(selectedGroupIDs)) selectedGroupIDs = [selectedGroupIDs];

    // check selected Group IDs against actual Group IDs
    if (Array.isArray(selectedGroupIDs)) {
        // TODO: pull key for GroupID from config
        const actualGroupIDs = [...new Set(_data_.map((d) => d.GroupID))];
        for (const selectedGroupID of selectedGroupIDs) {
            if (actualGroupIDs.includes(selectedGroupID) === false)
                selectedGroupIDs = selectedGroupIDs.filter(
                    (groupID) => groupID !== selectedGroupID
                );
        }
    }

    return selectedGroupIDs;
}
