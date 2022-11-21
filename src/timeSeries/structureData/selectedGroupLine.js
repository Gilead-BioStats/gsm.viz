import { color as d3color } from 'd3';

export default function selectedGroupLine(data, config, labels) {
    if (config.selectedGroupIDs.length === 0)
        return null;

    const lineData = data
        .filter((d) => config.selectedGroupIDs.includes(d.groupid))
        .map((d, i) => {
            const datum = { ...d };
            datum.x = datum[config.x];
            datum.y = +datum[config.y];
            return datum;
        });

    const color = '#1890FF';
    const backgroundColor = d3color(color);
    backgroundColor.opacity = 1;
    const borderColor = d3color(color);
    borderColor.opacity = 0.25;

    const dataset = {
        data: lineData,
        backgroundColor,
        borderColor,
        label:
            config.selectedGroupIDs.length > 0
                ? `${config.group} ${lineData[0]?.groupid}`
                : '',
        pointStyle: 'circle',
        purpose: 'highlight',
        radius: 2.5,
        type: 'line',
    };

    return dataset;
}
