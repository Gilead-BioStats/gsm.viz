import { format } from 'd3';

export default function tooltip(config) {
    return {
        enabled: false,
        external: function (context) {
            let tooltipEl = config.tooltipDiv;

            // Hide if no tooltip
            const tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            if (context.tooltip._active[0]) {
                let dataIndex = context.tooltip._active[0].index;
                let datum = context.chart.data.datasets[0].data[dataIndex];

                tooltipEl.querySelector('.rbm-tooltip-header-value').innerHTML =
                    datum.x;

                tooltipEl.querySelector('.numeratorLabel').innerHTML =
                    config.numeratorLabel;
                tooltipEl.querySelector('.numerator').innerHTML =
                    datum.numerator;

                tooltipEl.querySelector('.denominatorLabel').innerHTML =
                    config.denominatorLabel;
                tooltipEl.querySelector('.denominator').innerHTML =
                    datum.denominator;

                tooltipEl.querySelector('.outcome').innerHTML = config.outcome;
                tooltipEl.querySelector('.metric').innerHTML = format('.3f')(
                    datum.metric
                );

                tooltipEl.querySelector('.yLabel').innerHTML = config.yLabel;
                tooltipEl.querySelector('.y').innerHTML = format('.3f')(
                    datum.y
                );

                const position = context.chart.canvas.getBoundingClientRect();

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left =
                    position.left +
                    window.pageXOffset +
                    tooltipModel.caretX +
                    'px';
                tooltipEl.style.top =
                    position.top +
                    window.pageYOffset +
                    tooltipModel.caretY +
                    'px';
                tooltipEl.style.padding =
                    tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                tooltipEl.style.pointerEvents = 'none';
            }

            /*
            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }
            */
        },
        /*
        callbacks: {
            label: (data) => {
                const datum = data.dataset.data[data.dataIndex];
                const tooltip = [
                    `${config.xLabel}: ${datum.x}`,
                    `${config.numeratorLabel}: ${datum.numerator}`,
                    `${config.denominatorLabel}: ${format(',')(
                        datum.denominator
                    )}`,
                    `${config.outcome}: ${format('.3f')(datum.metric)}`,
                    `${config.yLabel}: ${format('.3f')(datum.y)}`,
                    //`${config.nLabel}: ${datum.n}`,
                ];

                return tooltip;
            },
            title: () => null,
        },
        // events: ['click'],
        */
    };
}
