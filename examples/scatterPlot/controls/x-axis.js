const xAxisType = function (instance, setup = false) {
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
