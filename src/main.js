// dependencies
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// modules
import barChart from './barChart';
import scatterPlot from './scatterPlot';
import sparkline from './sparkline';
import timeSeries from './timeSeries';

Chart.register(annotationPlugin);

const rbmViz = {
    barChart,
    scatterPlot,
    sparkline,
    timeSeries,
};

export default rbmViz;
