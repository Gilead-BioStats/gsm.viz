const dataFiles = ["../data/results_summary.csv", "../data/meta_workflow.csv"];

const dataPromises = dataFiles.map((dataFile) =>
  fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
  .then((texts) => texts.map((text) => d3.csvParse(text)))
  .then((datasets) => {
    // data
    const workflow = datasets[1].sort((a, b) =>
      d3.ascending(a.workflowid, b.workflowid)
    )[0];
    const results = datasets[0].filter(
      (d) => d.workflowid === workflow.workflowid
    );

    // visualization
    rbmViz.scatterPlot(document.getElementById("container"), results, workflow);
  });
