import scatterPlot from './scatterPlot';
import barPlot from './barPlot';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

const rbmViz = {
    scatterPlot,
    barPlot,
};

export default rbmViz;
