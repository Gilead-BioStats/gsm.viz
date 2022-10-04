import getPoints from '../util/getPoints';
import getPointDatum from '../util/getPointDatum';

export default function onHover(event) {
    const chart = event.chart;
    const config = chart.data.config;

    const points = getPoints(event);

    if (
        points.length &&
        chart.data.datasets[points[0].datasetIndex].type === 'scatter'
    ) {
        const datum = getPointDatum(points, chart);
        config.hoverEvent.data = datum;
        chart.canvas.dispatchEvent(config.hoverEvent);
        event.native.target.style.cursor = 'pointer';
    } else {
        event.native.target.style.cursor = 'default';
    }
}
