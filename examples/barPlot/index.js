fetch("../data/results_summary.csv")
  .then((response) => response.text())
  .then((text) => d3.csvParse(text))
  .then((data) => {
    let flag = data
      .filter((d) => d.workflowid === "kri0001")
      .map((d) => d.flag);

    // we store some object somewhere globally to use colors?
    let colors = {
      yellow: "#FADB14",
      green: "#52C41A",
      red: "#FF4D4F",
    };

    const chartData = {
      datasets: [
        {
          type: "line",
          label: "Flagged Threshold",
          //backgroundColor: colors.yellow,
          data: [],
          fill: false,
          borderColor: colors.red,
        },
        {
          type: "line",
          label: "At Risk Threshold",
          //backgroundColor: colors.red,
          data: [],
          fill: false,
          borderColor: colors.yellow,
        },
        {
          label: "Flagged Sites",
          type: "bar",
          data: data
            .filter((d) => d.workflowid === "kri0001")
            .filter((d) => d.flag === "-1")
            .map((d) => ({
              x: d.groupid,
              y: parseInt(d.score),
            })),
          backgroundColor: colors.red,
        },
        {
          label: "At Risk Sites",
          type: "bar",
          data: data
            .filter((d) => d.workflowid === "kri0001")
            .filter((d) => d.flag === "0")
            .map((d) => ({
              x: d.groupid,
              y: parseInt(d.score),
            })),
          backgroundColor: colors.yellow,
        },
        {
          label: "Sites Not Flagged Or at Risk",
          type: "bar",
          data: data
            .filter((d) => d.workflowid === "kri0001")
            .filter((d) => d.flag === "1")
            .map((d) => ({
              x: d.groupid,
              y: parseInt(d.score),
            })),
          backgroundColor: colors.green,
        },
      ],
    };

    let options = {
      plugins: {
        datalabels: {
          //anchor: "end",
          //align: "top",

          // anchor: "start",
          // align: "bottom",
          anchor: function (context) {
            let y = context.dataset.data[context.dataIndex].y;
            return y < 0 ? "end" : "start";
          },
          align: function (context) {
            let y = context.dataset.data[context.dataIndex].y;
            return y < 0 ? "top" : "bottom";
          },
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
              drawTime: "beforeDatasetsDraw",
              type: "line",
              yMin: 10,
              yMax: 10,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [5],
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
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
          grid: {
            borderDash: [5],
          },
        },
      },
    };

    const output = rbmViz.barPlot(
      document.getElementById("canvas"),
      chartData,
      options
    );

    function generateLegend() {
      const chartBox = document.querySelector(".chartBox");
      const div = document.createElement("DIV");
      div.setAttribute("class", "customLegend");

      const ul = document.createElement("UL");

      output.legend.legendItems.forEach((dataset, index) => {
        const text = dataset.text;
        const stroke = dataset.strokeStyle;
        const fill = dataset.fillStyle;
        const fontColor = "#666";
        const dat = dataset.data;

        const li = document.createElement("LI");
        const spanBox = document.createElement("SPAN");
        spanBox.style.borderColor = stroke;

        if (fill == "rgba(0,0,0,0.1)") {
          spanBox.setAttribute("class", "legend-annotation");
        } else {
          spanBox.setAttribute("class", "legend-content");
          spanBox.style.backgroundColor = fill;
        }

        const p = document.createElement("P");
        const textNode = document.createTextNode(text);

        ul.appendChild(li);
        li.appendChild(spanBox);
        li.appendChild(p);
        p.appendChild(textNode);
      });

      chartBox.appendChild(div);
      div.appendChild(ul);
    }

    generateLegend();
  });
