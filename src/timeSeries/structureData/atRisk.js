export default function atRisk(_data_, config) {
    const pointData = _data_
        .filter(d => Math.abs(+d.flag) === 1)
        .map(d => {
            const datum = { ...d };
            datum.x = datum[config.x];
            datum.y = +datum[config.y];
            return datum;
        });

    const color = config.colorScheme
        .find(color => color.flag.some(flag => Math.abs(flag) === 1));
    color.rgba.opacity = 0.5

    const dataset = {
        type: 'scatter',
        data: pointData,
        borderColor: color.color,
        backgroundColor: color.rgba + '',
        radius: 1.5,
    };

    return dataset;
}
