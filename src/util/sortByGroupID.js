import { ascending } from 'd3';

export default function sortByGroupID(data, config) {
    const numericGroupIDs = data.every((d) =>
        /^\d+$/.test(d.raw.groupid)
    );

    const dataSorted = data
        .sort((a, b) => {
            // order selected group ID first
            const selected =
                config.selectedGroupIDs.includes(
                    b.raw.groupid
                ) -
                config.selectedGroupIDs.includes(
                    a.raw.groupid
                );

            // order remaining group IDs alphanumerically
            const alphanumeric = numericGroupIDs
                ? ascending(+a.raw.groupid, +b.raw.groupid)
                : ascending(a.raw.groupid, b.raw.groupid);

            return selected || alphanumeric;
        });

    return(dataSorted);
}
