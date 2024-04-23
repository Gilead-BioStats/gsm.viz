// dependencies
import { CategoryScale, Chart, LinearScale } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
    BoxAndWiskers,
    BoxPlotController,
    Violin,
    ViolinController,
} from '@sgratzl/chartjs-chart-boxplot';

// modules
import barChart from './barChart.js';
import scatterPlot from './scatterPlot.js';
import sparkline from './sparkline.js';
import timeSeries from './timeSeries.js';
import siteOverview from './siteOverview.js';

Chart.register(
    annotationPlugin,
    BoxAndWiskers,
    BoxPlotController,
    CategoryScale,
    LinearScale,
    Violin,
    ViolinController
);

// TODO: implement class-based modules
const rbmViz = {
    // bar chart
    barChart: barChart.bind({
        x: 'groupid',
        y: 'score',
        chartType: 'bar',
        dataType: 'continuous',
    }),
    barChartMetric: barChart.bind({
        x: 'groupid',
        y: 'metric',
        chartType: 'bar',
        dataType: 'continuous',
    }),
    barChartScore: barChart.bind({
        x: 'groupid',
        y: 'score',
        chartType: 'bar',
        dataType: 'continuous',
    }),

    // scatter plot
    scatterPlot: scatterPlot.bind({
        x: 'denominator',
        y: 'numerator',
        chartType: 'scatter',
        dataType: 'discrete',
    }),

    // sparkline
    sparkline: sparkline.bind({
        x: 'snapshot_date',
        y: 'score',
        chartType: 'line',
        dataType: 'continuous',
    }),
    sparklineMetric: sparkline.bind({
        x: 'snapshot_date',
        y: 'metric',
        chartType: 'line',
        dataType: 'continuous',
    }),
    sparklineScore: sparkline.bind({
        x: 'snapshot_date',
        y: 'score',
        chartType: 'line',
        dataType: 'continuous',
    }),
    sparklineDiscrete: sparkline.bind({
        x: 'snapshot_date',
        y: 'n_at_risk_or_flagged',
        chartType: 'line',
        dataType: 'discrete',
    }),

    // time series
    timeSeries: timeSeries.bind({
        x: 'snapshot_date',
        y: 'score',
        chartType: 'boxplot',
        dataType: 'continuous',
    }),
    timeSeriesScore: timeSeries.bind({
        x: 'snapshot_date',
        y: 'score',
        chartType: 'boxplot',
        dataType: 'continuous',
    }),
    timeSeriesDiscrete: timeSeries.bind({
        x: 'snapshot_date',
        y: 'n_at_risk_or_flagged',
        chartType: 'line',
        dataType: 'discrete',
    }),
    timeSeriesQTL: timeSeries.bind({
        x: 'snapshot_date',
        y: 'metric',
        chartType: 'identity',
        dataType: 'continuous',
    }),

    // site overview
    siteOverview,
};

export default rbmViz;
