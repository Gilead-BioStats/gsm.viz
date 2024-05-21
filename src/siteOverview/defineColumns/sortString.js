export default function sortString(sortAscending, sortKey, data) {
    return data.sort((a, b) => {
        const defaultSort = sortAscending
            ? a[sortKey].value.localeCompare(b[sortKey].value)
            : b[sortKey].value.localeCompare(a[sortKey].value);

        return defaultSort;
    });
}
