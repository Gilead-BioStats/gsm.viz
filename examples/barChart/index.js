const dataFiles = ['../data/meta_workflow.csv', '../data/results_summary.csv'];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        const [workflow] = datasets[0] // destructured assignment
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        datasets[1].forEach((d) => {
            if (Math.abs(+d.score) > 10) {
                d.flag = Math.sign(+d.score) * 2;
            }
        });
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // visualization
        const instance = rbmViz.default.barChart(
            document.getElementById('container'),
            results,
            workflow
        );

        // Handle data change event.
        document.querySelector('#kri').addEventListener('change', (event) => {
            const workflow = datasets[0].find(
                (d) => d.workflowid === event.target.value
            );
            const results = datasets[1].filter(
                (d) => d.workflowid === workflow.workflowid
            );

            const isChecked = document.getElementById('inliners').checked;

            instance.helpers.updateBarData(
                instance,
                results,
                workflow,
                isChecked
            );
        });

        // TODO: update data to inlcude/exclude inliners
        document
            .querySelector('#inliners')
            .addEventListener('change', (event) => {
                const current_kri = document.getElementById('kri').value;

                const workflow = datasets[0].find(
                    (d) => d.workflowid === current_kri
                );

                const isChecked = event.target.checked;

                instance.helpers.updateBarData(
                    instance,
                    results,
                    workflow,
                    isChecked
                );
            });
    });
