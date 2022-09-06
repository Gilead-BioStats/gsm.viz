import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

/**
 * chart.js barchart wrapper function
 * @param  {Node} arg1 HTML element to place plot within
 * @param  {Object} arg2 data to be used in bar chart, categorical x-axis, numeric y-axis
 * @param  {Object} arg3 the configuration for the plot including labels, annotations, colors
 * @returns {Node} responsive barchart inside the delieniated container
 */
export default function barPlot(ctx, data, config) {
    const chart = new Chart(ctx, {
        data: data,
        //type: "bar",
        plugins: [ChartDataLabels],
        options: config,
    });

    return chart;
}
