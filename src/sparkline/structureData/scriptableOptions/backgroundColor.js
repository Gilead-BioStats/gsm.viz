// Figure out what's going on here
export default function backgroundColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[0];
    console.log(datum);

    if (dataset.type === 'line') {
        return datum === dataset.data[dataset.data.length - 1]
            ? 'red'//'rgba(0, 0, 0, 0.5)'
            : 'blue'//'rgba(0, 0, 0, 0.1)';
    }
}
