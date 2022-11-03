import { format } from 'd3';

/*
export default function tooltip(config) {
    return {
        custom: function (tooltipModel) {
            // EXTENSION: filter is not enough! Hide tooltip frame
            if (!tooltipModel.body || tooltipModel.body.length < 1) {
                tooltipModel.caretSize = 0;
                tooltipModel.xPadding = 0;
                tooltipModel.yPadding = 0;
                tooltipModel.cornerRadius = 0;
                tooltipModel.width = 0;
                tooltipModel.height = 0;
            }
        },
        callbacks: {
            label: (data) => {
                const datum = data.dataset.data[data.dataIndex];
                const tooltip = [
                    `${datum.groupid}`,
                    `${format(',d')(datum.y)} ${config.yLabel}`,
                    `${format(',d')(datum.x)} ${config.xLabel}`,
                    `${config.outcome}: ${format('.3f')(datum.metric)}`,
                ];

                return tooltip;
            },
            title: () => null,
        },
        events: ['click', 'mouseenter', 'mouseover'],
        filter: (data) => data.dataset.type !== 'line', // turns off tooltip for bounds
    };
}
*/

export default function tooltip(config) {
    return {
        enabled: false,
        external: function (context) {
            let tooltipEl = context.chart.data.config.tooltipDiv;
            console.log(context.tooltip._active[0]);
            let dataIndex = context.tooltip._active[0].index;
            console.log(dataIndex);
            let datum = context.chart.data.datasets[0].data[dataIndex];

            // Hide if no tooltip
            const tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }

            tooltipEl.querySelector('.rbm-tooltip-header-value').innerHTML =
                datum.groupid;
            tooltipEl.querySelector(
                '.rbm-tooltip-body-item-value.observed'
            ).innerHTML = datum.y + ' AEs';
            tooltipEl.querySelector(
                '.rbm-tooltip-body-item-value.threshold'
            ).innerHTML = datum.x + ' AEs';

            const position = context.chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left =
                position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top =
                position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.padding =
                tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
            tooltipEl.style.pointerEvents = 'none';
        },
        events: ['click', 'mouseenter', 'mouseover'],
        filter: (data) => data.dataset.type !== 'line', // turns off tooltip for bounds
    };
}
