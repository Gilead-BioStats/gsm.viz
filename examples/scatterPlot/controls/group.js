// Add event listener to highlight groups.
const group = function (datasets, setup = false) {
    let instance = getChart();
    const groupDropdown = document.querySelector('#group');

    if (setup) {
        const option = document.createElement('option');
        option.value = 'None';
        option.innerHTML = 'None';
        groupDropdown.appendChild(option);

        const groupIDs = [...new Set(datasets[0].map((d) => d.GroupID))].sort(
            (a, b) => a - b
        );

        for (i in groupIDs) {
            const option = document.createElement('option');
            option.value = groupIDs[i];
            option.innerHTML = groupIDs[i];
            groupDropdown.appendChild(option);
        }

        groupDropdown.value = instance.data.config.selectedGroupIDs.length
            ? instance.data.config.selectedGroupIDs[0]
            : 'None';

        groupDropdown.addEventListener('change', (event) => {
            instance = getChart();
            instance.data.config.selectedGroupIDs = event.target.value;
            instance.data.config.xType = xAxisType();
            instance.helpers.updateConfig(instance, instance.data.config);
        });
    }

    return groupDropdown.value;
};
