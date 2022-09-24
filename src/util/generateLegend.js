import { index } from 'd3';

function updateLegend(click, output) {
    const element = click.target.parentNode;
    element.classList.toggle('fade');
    output.update();
}

export default function generateLegend(output, container) {
    console.log('count runs');
    if (document.querySelectorAll('.customLegend').length !== 0) {
        let div = document.querySelectorAll('.customLegend');
        div[0].innerHTML = '';
    }

    const chartBox = document.querySelector(container);
    const div = document.createElement('DIV');
    div.setAttribute('class', 'customLegend');

    const ul = document.createElement('UL');

    let li = document.createElement('LI');
    let spanBox = document.createElement('SPAN');
    spanBox.style.borderColor = 'gray';
    spanBox.setAttribute('class', 'legend-content inliners');
    spanBox.setAttribute('id', 'inliner-legend');
    spanBox.style.backgroundColor = '#e3e3e3';
    spanBox.innerHTML = output.options.inliner_count;
    ul.appendChild(li);
    li.appendChild(spanBox);

    output.legend.legendItems
        // filter to only include one instance of each flag name
        // by filtering legend items by their text
        .filter((element, index, array) => {
            return array.findIndex((a) => a.text == element.text) === index;
        })
        .forEach((dataset, index) => {
            const text = dataset.text;
            const stroke = dataset.strokeStyle;
            const fill = dataset.fillStyle;

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

            /*
            li.onclick = (click) => {
                const isHidden = !output.isDatasetVisible(index);
                output.setDatasetVisibility(index, isHidden);
                updateLegend(click, output);
            };
            */

            ul.appendChild(li);
            li.appendChild(spanBox);
            li.appendChild(p);
            p.appendChild(textNode);
        });

    chartBox.prepend(div);
    div.appendChild(ul);
    //}
}
