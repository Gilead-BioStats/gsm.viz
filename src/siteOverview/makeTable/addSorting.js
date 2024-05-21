export default function addSorting(thead, tbody, columns) {
    thead.selectAll('th').on('click', function (event, d) {
        console.log(d);
        const sortAscending = d.sort === 1; this.classList.contains('ascending');
        const sortKey = d.value;
        const data = tbody.selectAll('tr').data();

        // TODO: handle sorting by non-numeric and missing values
        tbody.selectAll('tr').sort((a, b) => {
            const defaultSort = sortAscending
                ? a[i].value - b[i].value
                : b[i].value - a[i].value;

            // sort NaN last
            const nanSort = isNaN(a[i].value)
                ? 1
                : -1;

            return defaultSort || nanSort;
        });

        this.classList.toggle('ascending', !sortAscending);
    });
}
