import { getRelativePosition } from 'chart.js/helpers';
import getPoints from '../util/getPoints';
import getPointDatum from '../util/getPointDatum';

export default function onClick(event) {
    const chart = event.chart;
    const config = chart.data.config;

    const canvasPosition = getRelativePosition(event, chart);

    // Substitute the appropriate scale IDs
    const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
    const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);

    const points = getPoints(event);

    if (
        points.length &&
        chart.data.datasets[points[0].datasetIndex].type === 'scatter'
    ) {
        const datum = getPointDatum(points, chart);
        config.clickEvent.data = datum;
        chart.canvas.dispatchEvent(config.clickEvent);
    } else {
        //const image = chart.toBase64Image();
    }
}
