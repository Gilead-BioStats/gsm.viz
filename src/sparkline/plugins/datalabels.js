export default function datalabels(config) {
    console.log(config);
    return {
        //align: (context) => (
        //    Math.sign(context.dataset.data[context.dataIndex].y) === 1 ? 'start' : 'end'
        //),
        anchor: (context) => 'end',
        color: 'black',
        display: (context) =>
            context.dataIndex === context.dataset.data.length - 1,
        formatter: (value, context) => {
            const datum = context.dataset.data[context.dataIndex];
            return Math.round(datum * 1000) / 1000;
        },
        //rotation: -90,
    };
}
