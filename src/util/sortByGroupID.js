import { ascending } from 'd3';

export default function sortByGroupID(data, config) {
    const numericGroupIDs = data.every((d) => /^\d+$/.test(d.raw.GroupID));

    const dataSorted = data.sort((a, b) => {
        // order selected group ID first
        const selected =
            config.selectedGroupIDs.includes(b.raw.GroupID) -
            config.selectedGroupIDs.includes(a.raw.GroupID);

        // order remaining group IDs alphanumerically
        const alphanumeric = numericGroupIDs
            ? ascending(+a.raw.GroupID, +b.raw.GroupID)
            : ascending(a.raw.GroupID, b.raw.GroupID);

        return selected || alphanumeric;
    });

    return dataSorted;
}
