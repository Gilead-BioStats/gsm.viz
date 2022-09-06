export default function updateOption(chart, option, value) {
    console.log(chart);
    console.log(option);
    option.split('.')
        .reduce(
            (options,key) => options && options[key] || null,
            chart.options
        );
    //conosle.log(jkjk
    //chart.options[.scales.
}
