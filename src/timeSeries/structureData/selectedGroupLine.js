import { color as d3color, max } from 'd3';

export default function selectedGroupLine(data, config, labels) {
    if (config.selectedGroupIDs.length === 0) return null;

    const lineData = data
        .filter((d) => config.selectedGroupIDs.includes(d.groupid))
        .map((d, i) => {
            const datum = { ...d };
            datum.x = datum[config.x];
            datum.y = +datum[config.y];
            return datum;
        });

    const color = 'black';
    const backgroundColor = d3color(color);
    backgroundColor.opacity = 0.5;
    const borderColor = d3color(color);
    borderColor.opacity = 0.5;

    const dataset = {
        data: lineData,
        backgroundColor: function (d) {
            const color = config.colorScheme.find((color) =>
                color.flag.includes(+d.raw?.flag)
            );
            if (color !== undefined) color.rgba.opacity = 0.75;

            return color !== undefined ? color.rgba + '' : backgroundColor;
        },
        borderColor: function (d) {
            return d.type === 'data' ? 'black' : borderColor;
        },
        label: '',
        pointStyle: 'circle',
        purpose: 'highlight',
        radius: 3,
        spanGaps: true,
        type: 'line',
    };

    return dataset;
}
