const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary_over_time.csv',
    //'../data/flag_summary_over_time.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        const [workflow] = datasets[0] // destructured assignment that retrieves first workflow ID
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        workflow.y = 'metric';
        const groupids = [...new Set(datasets[1].map((d) => d.groupid))].filter(
            (_) => Math.random() < 0.25
        );
        //const groupid = groupids[
        //    Math.floor(Math.random()*groupids.length)
        //];
        const results = datasets[1].filter(
            (d) =>
                d.workflowid === workflow.workflowid &&
                groupids.includes(d.groupid)
        );

        // configuration

        // visualization
        for (const i in groupids) {
            const groupid = groupids[i];
            const container = document.getElementById('container');
            const subcontainer = document.createElement('div');
            subcontainer.id = `container_${i}`;
            container.appendChild(subcontainer);
            subcontainer.style.display = 'inline-block';
            //const display = document.createElement('span');
            //display.innerHTML = 'spark!';
            //container.appendChild(display);
            //display.onclick = () => {
            //    console.log('click');
            //    subcontainer.style.display = 'inline-block';
            //};

            // visualization
            const instance = rbmViz.default.sparkline(
                subcontainer,
                results.filter((d) => d.groupid === groupid),
                workflow
            );
        }

        // controls
        //kri(workflow, datasets, true);
        //site(datasets, true);
        //xAxisType(true);
        //lifecycle(datasets, 'scatterPlot', true);
        download(true);
    });
