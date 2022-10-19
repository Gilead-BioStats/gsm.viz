// Add event listener to outcome toggle.
const outcome = function (setup = false) {
    const instance = getChart();
    const outcomeToggle = document.querySelector('#outcome');

    if (setup)
        outcomeToggle.addEventListener('change', (event) => {
            instance.instance.helpers.updateOption(
                instance,
                'scales.x.type',
                event.target.value
            );
        });

    return xAxisToggle.querySelector('input:checked').value;
};
