// Add event listener to highlight groups.
const group = function (datasets, setup = false) {
    let instance = getChart();
    const groupDropdown = document.querySelector('#GroupID');

    if (setup) {
        const option = document.createElement('option');
        option.value = 'None';
        option.innerHTML = 'None';
        groupDropdown.appendChild(option);

        const groupIDs = Array.from(
            new Set(datasets[0].map((d) => d.GroupID)).values()
        ).sort((a, b) => a - b);

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
            instance.helpers.updateConfig(
                instance,
                instance.data.config,
                instance.data._thresholds_
            );
        });
    }

    return groupDropdown.value;
};
