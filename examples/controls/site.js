// Add event listener to highlight sites.
const site = function (datasets, setup = false) {
    const instance = getChart();
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
            instance.data.config.selectedGroupIDs = event.target.value;
            instance.helpers.updateConfig(instance, instance.data.config);
        });
    }

    return siteDropdown.value;
};
