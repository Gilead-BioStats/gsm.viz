// dependencies
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// modules
import barChart from './barChart';
import scatterPlot from './scatterPlot';

Chart.register(annotationPlugin);

const rbmViz = {
    barChart,
    scatterPlot,
};

export default rbmViz;
