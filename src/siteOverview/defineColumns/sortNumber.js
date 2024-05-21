export default function sortNumber(sortAscending, sortKey, data) {
    return data.sort((a, b) => {
        const defaultSort = sortAscending
            ? a[i].value - b[i].value
            : b[i].value - a[i].value;

        // sort NaN last
        const nanSort = isNaN(a[i].value)
            ? 1
            : -1;

        return defaultSort || nanSort;
    });
}
