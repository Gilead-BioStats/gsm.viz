import { min, max } from 'd3';

export default function getScales(config, data) {
    const yMin = min(data);
    const yMax = max(data);
    const range = yMin === yMax ? yMin : yMax - yMin;
    const scales = {
        x: {
            display: false,
            title: {
                display: true,
                text: config.xLabel,
            },
            //type: config.xType,
        },
        y: {
            display: false,
            min: yMin - range * 0.1,
            max: yMax + range * 0.1,
            title: {
                display: true,
                text: config.yLabel,
            },
            //type: config.yType,
        },
    };

    return scales;
}
