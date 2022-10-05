const site = function (datasets, instance, setup = false) {
    const siteDropdown = document.querySelector('#groupid');

    if (setup) {
        const option = document.createElement('option');
        option.value = 'None';
        option.innerHTML = 'None';
        siteDropdown.appendChild(option);

        const groupIDs = Array.from(
            new Set(datasets[1].map((d) => d.groupid)).values()
        ).sort((a, b) => a - b);

        for (i in groupIDs) {
            const option = document.createElement('option');
            option.value = groupIDs[i];
            option.innerHTML = groupIDs[i];
            siteDropdown.appendChild(option);
        }

        siteDropdown.value = instance.data.config.selectedGroupIDs.length
            ? instance.data.config.selectedGroupIDs[0]
            : 'None';

        siteDropdown.addEventListener('change', (event) => {
            instance.destroy();

            //instance.helpers
            //    .updateData(
            //        instance,
            //        results,
            //        workflow,
            //        bounds
            //    );

            const workflow = datasets[0].find((d) => d.workflowid === kri());
            const results = datasets[1].filter(
                (d) => d.workflowid === workflow.workflowid
            );
            const bounds = datasets[2].filter(
                (d) => d.workflowid === workflow.workflowid
            );
            workflow.selectedGroupIDs =
                event.target.value === 'None' ? [] : [event.target.value];
            //instance.helpers.updateData(instance, results, workflow, bounds);

            //workflow.selectedGroupIDs = [event.target.value];
            //instance.helpers.updateData(instance, results, workflow, bounds);

            instance = rbmViz.default.scatterPlot(
                document.getElementById('container'),
                results,
                workflow,
                bounds
            );
        });
    }

    return siteDropdown.value;
};
