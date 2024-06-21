export default function sortNumber(bodyRows, column) {
    const sortAscending = column.sortState < 1;

    bodyRows.sort((a, b) => {
        const aVal = a[column.index].sortValue;
        const bVal = b[column.index].sortValue;

        if (aVal === undefined || aVal === null) {
            return 1;
        }

        if (bVal === undefined || bVal === null) {
            return -1;
        }

        const defaultSort = sortAscending ? aVal - bVal : bVal - aVal;

        return defaultSort;
    });

    column.sortState = sortAscending ? 1 : -1;
}
