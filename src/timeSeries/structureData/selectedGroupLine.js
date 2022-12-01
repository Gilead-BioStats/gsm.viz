import { color as d3color } from 'd3';

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

    const color = '#666666';
    const backgroundColor = d3color(color);
    backgroundColor.opacity = 1;
    const borderColor = d3color(color);
    borderColor.opacity = 0.25;

    const dataset = {
        data: lineData,
        backgroundColor: function(d) {
            const color = config.colorScheme.find(
                color => color.flag.includes(+d.raw?.flag)
            );
            if (color !== undefined)
                color.rgba.opacity = .5;

            return color !== undefined
                ? color.rgba + ''
                : backgroundColor;
        },
        borderColor: function(d) {
            const color = config.colorScheme.find(
                color => color.flag.includes(+d.raw?.flag)
            );
            if (color !== undefined)
                color.rgba.opacity = 1;

            return color !== undefined
                ? 'black'//color.rgba + ''
                : borderColor;
        },
        label:
            config.selectedGroupIDs.length > 0
                ? `${config.group} ${lineData[0]?.groupid}`
                : '',
        pointStyle: 'circle',
        purpose: 'highlight',
        radius: 3,
        type: 'line',
    };

    return dataset;
}
