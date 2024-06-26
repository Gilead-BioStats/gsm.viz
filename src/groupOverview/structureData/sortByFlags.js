export default function sortByFlags(rowData) {
    const sortedRowData = rowData.sort((a, b) => {
        const redComparison = b[1].nRedFlags - a[1].nRedFlags;
        const amberComparison = b[1].nAmberFlags - a[1].nAmberFlags;
        const greenComparison = b[1].nGreenFlags - a[1].nGreenFlags;
        const groupComparison = a.key.localeCompare(b.key);

        return (
            redComparison ||
            amberComparison ||
            greenComparison ||
            groupComparison
        );
    });

    return sortedRowData;
}
