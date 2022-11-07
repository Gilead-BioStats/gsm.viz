export default function atRisk(_data_, config, labels) {
    const pointData = _data_
        .filter((d) => Math.abs(+d.flag) === 1)
        .map((d) => {
            const datum = { ...d };
            datum.x = datum[config.x]; //labels
            //.findIndex(label => label === datum[config.x]);
            datum.y = +datum[config.y];
            return datum;
        });

    const color = config.colorScheme.find((color) =>
        color.flag.some((flag) => Math.abs(flag) === 1)
    );
    color.rgba.opacity = 0.5;

    const dataset = {
        borderColor: color.color,
        backgroundColor: color.rgba + '',
        data: pointData,
        label: pointData.length
            ? 'At Risk'
            : '',
        purpose: 'scatter',
        radius: 1.5,
        type: 'scatter',
    };

    return dataset;
}
