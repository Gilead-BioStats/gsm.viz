import { format, max, min } from 'd3';

export default function annotations(config, data) {
    // horizontal position
    const xMin = 0;
    const xMax = data.length - 1;
    const xValue = xMax;

    // vertical position
    const yMin = min(data, (d) => +d[config.y]);
    const yMax = max(data, (d) => +d[config.y]);
    const range = yMin === yMax ? yMin : yMax - yMin;
    const yValue = range === yMin ? yMin : yMin + range / 2;

    // content
    const datum = data.slice(-1)[0];
    // TODO: figure out why background isn't less opaque
    const content = [
        format(' 4d')(datum.y),
        //.replace(/^0+/,
        //.replace(/^0/, '')
    ];

    return {
        clip: false,
        annotations: {
            label1: {
                type: 'label',
                xValue,
                yValue,
                //backgroundColor: 'rgba(245,245,245)',
                content,
                font: {
                    size: 16,
                    family: 'lucida console',
                },
                position: {
                    x: 'start',
                    y: 'middle',
                },
            },
        },
    };
}
