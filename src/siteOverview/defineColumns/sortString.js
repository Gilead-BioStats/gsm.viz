export default function sortString(bodyRows, column) {
    const sortAscending = column.sortState < 1;

    bodyRows.sort((a, b) => {
        const aVal = a[column.index].value;
        const bVal = b[column.index].value;

        if (aVal === undefined || aVal === null) {
            return 1;
        }

        if (bVal === undefined || bVal === null) {
            return -1;
        }

        const defaultSort = sortAscending
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);

        return defaultSort;
    });

    column.sortState = sortAscending ? 1 : -1;
}
