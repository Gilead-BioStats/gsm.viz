// Add event listener to QTL dropdown.
const qtl = function (workflow, datasets, setup = false) {
    const instance = getChart();
    const qtlDropdown = document.querySelector('#qtl');

    if (setup === true) {
        const qtls = [
            ...new Set(datasets[1].map((d) => d.workflowid)).values(),
        ];

        for (const i in qtls) {
            const option = document.createElement('option');
            option.value = qtls[i];
            option.innerHTML = qtls[i];
            qtlDropdown.appendChild(option);
        }

        qtlDropdown.value = workflow.workflowid;
        qtlDropdown.addEventListener('change', (event) => {
            const results = datasets[0].filter(
                (d) => d.workflowid === event.target.value
            );
            const workflow = datasets[1].find(
                (d) => d.workflowid === event.target.value
            );
            const parameters = datasets[2].filter(
                (d) => d.workflowid === event.target.value
            );
            console.table(parameters);
            const analysis = datasets[3].filter(
                (d) => d.workflowid === event.target.value
            );

            instance.helpers.updateData(instance, results, workflow, parameters, analysis);
        });
    }

    return qtlDropdown.value;
};
