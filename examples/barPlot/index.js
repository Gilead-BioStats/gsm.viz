fetch("../data/results_summary.csv")
  .then((response) => response.text())
  .then((text) => d3.csvParse(text))
  .then((data) => {
    let flag = data
      .filter((d) => d.workflowid === "kri0001")
      .map((d) => d.flag);

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
          responsive: true,
          maintainAspectRatio: false,
        },
      ],
    };

    console.log(chartData);

    const output = rbmViz.barPlot(document.getElementById("canvas"), chartData);
  });
