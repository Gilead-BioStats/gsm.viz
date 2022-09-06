<<<<<<< HEAD
fetch("../data/gsm.csv")
  .then((response) => response.text())
  .then((text) => d3.csvParse(text))
  .then((data) => {
    console.table(data.filter((d) => d.workflowid === "kri0001"));
    const chartData = {
      datasets: [
        {
          label: "Scatter Plot of Exposure and Events by Site",
          data: data
            .filter((d) => d.workflowid === "kri0001")
            .map((d) => ({
              x: d.denominator,
              y: d.numerator,
            })),
          backgroundColor: "rgb(255, 99, 132)",
        },
      ],
    };

    const output = rbmViz.scatterPlot(
      document.getElementById("canvas"),
      chartData
    );
  });
=======
const dataFiles = [
    '../data/results_summary.csv',
    '../data/meta_workflow.csv'
];

const dataPromises = dataFiles
    .map(dataFile => (
        fetch(dataFile).then(response => response.text())
    ));

Promise.all(dataPromises)
    .then(texts => texts.map(text => d3.csvParse(text)))
    .then(datasets => {
        // data
        const workflow = datasets[1]
            .sort((a,b) => (
                d3.ascending(a.workflowid, b.workflowid)
            ))[0];
        const results = datasets[0]
            .filter(d => d.workflowid === workflow.workflowid);

        // visualization
        rbmViz.scatterPlot(
            document.getElementById('container'),
            results,
            workflow
        );
    });
>>>>>>> 9372744cd7dc5b8ca820da308f9e16a22b7ae98f
