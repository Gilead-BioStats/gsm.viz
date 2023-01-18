// Add event listener to x-axis type toggle.
const outcome = function (setup = false) {
    const instance = getChart();
    const xAxisToggle = document.querySelector('#x-axis-type');

    if (setup)
        xAxisToggle.addEventListener('change', (event) => {
            instance.helpers.updateOption(
                instance,
                'scales.x.type',
                event.target.value
            );
        });

    return xAxisToggle.querySelector('input:checked').value;
};
