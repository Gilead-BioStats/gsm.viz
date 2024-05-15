export default function addSorting(thead, tbody, headerLabels) {
    thead.selectAll('th').on('click', function (event, d) {
        const i = headerLabels.findIndex((di) => di.key === d.key);
        const sortAscending = this.classList.contains('ascending');
        const sortKey = d.value;

        // TODO: handle sorting by non-numeric and missing values
        tbody.selectAll('tr').sort((a, b) => {
            if (sortAscending) {
                return a[i].value - b[i].value;
            } else {
                return b[i].value - a[i].value;
            }
        });

        this.classList.toggle('ascending', !sortAscending);
    });
}
