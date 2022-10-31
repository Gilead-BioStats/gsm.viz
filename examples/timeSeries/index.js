const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary_over_time.csv',
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
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // visualization
        //const instance = rbmViz.default.timeSeries(
        //    document.getElementById('container'),
        //    results,
        //    workflow,
        //    bounds
        //);
        function randomValues(count, min, max) {
            const delta = max - min;
            return Array.from({ length: count }).map(
                () => Math.random() * delta + min
            );
        }
        const scores = d3.rollups(
            results,
            group => group.map(d => +d.score),
            d => d.snapshot_date
        );
        const data = {
            labels: scores.map(d => d[0]),
            datasets: [
                {
                    label: 'Score',
                    backgroundColor: 'rgba(0,0,255,0.5)',
                    borderColor: 'blue',
                    borderWidth: 1,
                    outlierColor: '#999999',
                    padding: 10,
                    itemRadius: 0,
                    data: scores.map(d => d[1]),
                }
            ],
        };

        //window.onload = () => {
            const ctx = document.getElementById('canvas').getContext('2d');
            window.myBar = new Chart(ctx, {
                type: 'boxplot',
                data,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Box Plot Chart',
                    },
                },
            });
        //};
    });
