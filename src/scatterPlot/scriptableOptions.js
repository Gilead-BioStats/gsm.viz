export default function sccriptableOptions(config) {
    const radius = function (context, options) {
        const data = context.dataset;
        const datum = context.dataset.data[context.dataIndex];

        if (data.type === 'scatter') {
            return this.selectedGroupIDs.includes(datum.groupid) ? 5 : 3;
        }
    };

    const borderColor = function (context, options) {
        const data = context.dataset;
        const datum = context.dataset.data[context.dataIndex];

        if (data.type === 'scatter') {
            return this.selectedGroupIDs.includes(datum.groupid)
                ? 'black'
                : 'rgba(0, 0, 0, 0.1)';
        }
    };

    const borderWidth = function (context, options) {
        const data = context.dataset;
        const datum = context.dataset.data[context.dataIndex];

        if (data.type === 'scatter') {
            return this.selectedGroupIDs.includes(datum.groupid) ? 3 : 1;
        }
    };

    return {
        borderColor: borderColor.bind(config),
        borderWidth: borderWidth.bind(config),
        radius: radius.bind(config),
    };
}
