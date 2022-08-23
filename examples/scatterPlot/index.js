fetch('../data/gsm.csv')
    .then((response) => response.text())
    .then((text) => d3.csvParse(text))
    .then((data) => {
        console.log(
            d3.rollup(
                data,
                (group) => d3.extent(group, (d) => +d.denominator),
                (d) => d.workflowid
            )
        );
        const chartData = {
            datasets: [
                {
                    label: 'Scatter Plot of Exposure and Events by Site',
                    data: data
                        .filter((d) => d.workflowid === 'kri0001')
                        .map((d) => ({
                            x: d.denominator,
                            y: d.numerator,
                        })),
                    backgroundColor: 'rgb(255, 99, 132)',
                },
            ],
        };

        const output = rbmViz.scatterPlot(
            document.getElementById('canvas'),
            chartData
        );
    });
