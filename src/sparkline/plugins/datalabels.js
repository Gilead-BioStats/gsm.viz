export default function datalabels(config) {
    return {
        //align: (context) => (
        //    'start'
        //),
        //anchor: (context) => (
        //    'end'
        //),
        color: 'black',
        display: (context) =>
            context.dataIndex === context.dataset.data.length - 1,
        formatter: (value, context) => {
            const datum = context.dataset.data[context.dataIndex];
            return (Math.round(datum.y * 1000) / 1000).toString().replace(/^0/, '');
        },
        //rotation: -90,
    };
}
