import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
// import { getRelativePosition } from "chart.js/helpers";

export default function barPlot(ctx, data) {
  const chart = new Chart(ctx, {
    type: "bar",
    data: data,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
          rotation: 90,
          font: {
            weight: "bold",
          },
          formatter: function (value, ctx) {
            var index = ctx.dataIndex;
            var label = ctx.chart.data.labels[index];
            return label;
          },
        },
        annotation: {
          annotations: {
            line1: {
              type: "line",
              yMin: 10,
              yMax: 10,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [5],
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          title: {
            display: true,
            text: "AE Reporting Residual Score",
            /*
            color: "#911",
            font: {
              family: "Comic Sans MS",
              size: 20,
              weight: "bold",
              lineHeight: 1.2,
            },
            */
            padding: { top: 20, left: 0, right: 0, bottom: 0 },
          },
        },
      },
    },
  });

  return chart;
}
