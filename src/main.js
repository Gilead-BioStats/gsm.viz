// dependencies
import { Chart, LinearScale, CategoryScale } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
    BoxPlotController,
    BoxAndWiskers,
    ViolinController,
    Violin,
} from '@sgratzl/chartjs-chart-boxplot';

// modules
import barChart from './barChart';
import scatterPlot from './scatterPlot';
import sparkline from './sparkline';
import timeSeries from './timeSeries';

Chart.register(
    annotationPlugin,
    CategoryScale,
    LinearScale,
    BoxPlotController,
    BoxAndWiskers,
    ViolinController,
    Violin
);

const rbmViz = {
    barChart,
    scatterPlot,
    sparkline,
    timeSeries,
};

export default rbmViz;
