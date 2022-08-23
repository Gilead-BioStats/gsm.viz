import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

export default function scatterPlot(ctx, data) {
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: {
            onClick: (e) => {
                const canvasPosition = getRelativePosition(e, chart);

                // Substitute the appropriate scale IDs
                const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
                const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
            }
        }
    });

    return chart
}
