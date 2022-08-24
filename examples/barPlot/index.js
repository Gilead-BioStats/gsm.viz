fetch("../data/results_summary.csv")
  .then((response) => response.text())
  .then((text) => d3.csvParse(text))
  .then((data) => {
    let flag = data
      .filter((d) => d.workflowid === "kri0001")
      .map((d) => d.flag);

    // this should be a function in a utils folder prob?
    var colors = [];
    let yellow = "#FADB14";
    let green = "#52C41A";
    let red = "#FF4D4F";
    for (var i = 0; i < flag.length; i++) {
      var color;
      switch (flag[i]) {
        case "-1":
          color = red;
          break;
        case "0":
          color = yellow;
          break;
        case "1":
          color = green;
          break;
        //etc..
      }
      colors[i] = color;
    }

    const chartData = {
      datasets: [
        {
          label: "Bar Plot",
          data: data
            .filter((d) => d.workflowid === "kri0001")
            .map((d) => ({
              x: d.groupid,
              y: parseInt(d.score),
            })),
          backgroundColor: colors,
        },
      ],
    };

    let options = {
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
        legend: {
          display: true,
          position: "top",
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
  });
