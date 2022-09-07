export default function updateOption(chart, option, value) {
    const objPath = option.split('.');
    let obj = chart.options;
    for (let i = 0; i < objPath.length; i++) {
        if (i < objPath.length - 1) obj = obj[objPath[i]];
        else obj[objPath[i]] = value;
    }
    chart.update();
}
