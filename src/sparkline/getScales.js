import { min, max } from 'd3';

export default function getScales(config, data) {
    const yMin = min(data, (d) => d.y);
    const yMax = max(data, (d) => d.y);
    const range = (
        yMin !== yMax
            ? yMax - yMin
            : yMin === yMax && yMin !== 0
            ? yMin
            : 1
    );

    // TODO: use some function of canvas height and point radius to define y-domain
    const scales = {
        x: {
            display: false,
            //min: 0,
            //max: data.length,
            title: {
                display: true,
                text: config.xLabel,
            },
            //type: config.xType,
        },
        y: {
            display: false,
            min: yMin - range * 0.35,
            max: yMax + range * 0.35,
            title: {
                display: true,
                text: config.yLabel,
            },
            //type: config.yType,
        },
    };

    return scales;
}
