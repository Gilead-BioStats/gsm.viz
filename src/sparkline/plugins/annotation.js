import { format as d3format, max, min } from 'd3';

export default function annotations(config, data) {
    // horizontal position
    const xMin = 0;
    const xMax = data.length;
    const xValue = xMax;

    // vertical position
    const yMin = min(data, (d) => +d[config.y]);
    const yMax = max(data, (d) => +d[config.y]);
    const range = yMin === yMax ? yMin : yMax - yMin;
    const yValue = range === yMin ? yMin : yMin + range / 2;

    // Identify appropriate number format.
    const format = data.every((d) => +d[config.y] % 1 === 0)
        ? ' 4d'
        : range < 0.1
        ? '.3f'
        : range < 1
        ? '.2f'
        : '.1f';

    // content
    const datum = data.slice(-1)[0];
    const content = [
        //format('.1f')(datum.score),
        d3format(format)(datum.y).replace(/^0./, '.'),
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
                    size: 12,
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
