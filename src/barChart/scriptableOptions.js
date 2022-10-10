export default function scriptableOptions(config) {
    const borderColor = function (context, options) {
        const data = context.dataset;
        const datum = context.dataset.data[context.dataIndex];

        if (data.type === 'bar') {
            return this.selectedGroupIDs.includes(datum.groupid)
                ? 'black'
                : 'rgba(0, 0, 0, 0.1)';
        }
    };

    const backgroundColor = function (context, options) {
        const data = context.dataset;
        const datum = context.dataset.data[context.dataIndex];

        if (data.type === 'bar') {
            return this.selectedGroupIDs.includes(datum.groupid)
                ? 'black'
                : 'red';
        }
    };

    return {
        backgroundColor: backgroundColor.bind(config),
        borderColor: borderColor.bind(config),
    };
}
