function updateLegend(click, output) {
    const element = click.target.parentNode;
    element.classList.toggle('fade');
    console.log(output);
    output.update();
}

export default function generateLegend(output, container) {
    if (document.querySelectorAll('.customLegend').length === 0) {
        const chartBox = document.querySelector(container);
        const div = document.createElement('DIV');
        div.setAttribute('class', 'customLegend');

        const ul = document.createElement('UL');

        output.legend.legendItems.forEach((dataset, index) => {
            const text = dataset.text;
            const stroke = dataset.strokeStyle;
            const fill = dataset.fillStyle;
            const fontColor = '#666';
            const dat = dataset.data;

            const li = document.createElement('LI');
            const spanBox = document.createElement('SPAN');
            spanBox.style.borderColor = stroke;

            if (fill == 'rgba(0,0,0,0.1)') {
                spanBox.setAttribute('class', 'legend-annotation');
            } else {
                spanBox.setAttribute('class', 'legend-content');
                spanBox.style.backgroundColor = fill;
            }

            const p = document.createElement('P');
            const textNode = document.createTextNode(text);

            li.onclick = (click) => {
                const isHidden = !output.isDatasetVisible(index);
                output.setDatasetVisibility(index, isHidden);
                updateLegend(click, output);
            };

            ul.appendChild(li);
            li.appendChild(spanBox);
            li.appendChild(p);
            p.appendChild(textNode);
        });

        chartBox.prepend(div);
        div.appendChild(ul);
    }
}
