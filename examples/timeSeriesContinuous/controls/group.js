// Add event listener to highlight groups.
const group = function (datasets, setup = false) {
    const instance = getChart();
    const groupDropdown = document.querySelector('#group');

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
            instance.helpers.updateSelectedGroupIDs(event.target.value);
        });
    }

    return groupDropdown.value;
};
