// Add event listener to yaxis dropdown.
const yaxis = function (workflow, datasets, setup = false) {
    const instance = getChart();
    const yaxisDropdown = document.querySelector('#yaxis');

    if (setup === true) {
        const yaxis = [
            ...new Set(datasets[1].map((d) => d.workflowid)).values(),
        ];
        console.log(yaxis);
    }
};
