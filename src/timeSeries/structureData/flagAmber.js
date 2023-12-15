import colorScheme from '../../util/colorScheme.js';

export default function flagAmber(data, config, labels) {
    const pointData = data
        .filter((d) => Math.abs(+d.flag) === 1)
        .map((d) => {
            const datum = { ...d };
            datum.x = datum[config.x]; //labels
            //.findIndex(label => label === datum[config.x]);
            datum.y = +datum[config.y];
            return datum;
        });

    const color = colorScheme.find((color) =>
        color.flag.some((flag) => Math.abs(flag) === 1)
    );
    color.rgba.opacity = 0.5;

    const dataset = {
        borderColor: color.color,
        backgroundColor: color.rgba + '',
        data: pointData,
        label: '',
        listenHover: true,
        listenClick: true,
        pointStyle: 'circle',
        purpose: 'scatter',
        radius: 2,
        type: 'scatter',
    };

    return dataset;
}
