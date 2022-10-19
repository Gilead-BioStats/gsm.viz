import { format, max, min } from 'd3';

export default function annotations(config, data) {
    const xMax = data.length;
    const yMin = min(data, d => +d[config.y]);
    const yMax = max(data, d => +d[config.y]);
    const range = yMin === yMax ? yMin : yMax - yMin;
    const xValue = xMax;
    const yValue = range === yMin ? yMin : yMin + range/2;
    const content = [
        format('.3f')(data.slice(-1)[0][config.y]).replace(/^0/, '')
    ];
    console.log(content);

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
            size: 16
          },
            position: {
                x: 'start',
            },
        }
      }
    };
}
