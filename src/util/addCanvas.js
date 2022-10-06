import { Chart } from 'chart.js';
import addCustomHoverEvent from './addCanvas/addCustomHoverEvent';
import addCustomClickEvent from './addCanvas/addCustomClickEvent';

export default function addCanvas(_element_, config) {
    let canvas;

    // [ _element_ ] doesn't exist.
    if (!document.body.contains(_element_)) {
        console.error('addCanvas: [ _element_ ] does not exist.');

        return;
    }
    // [ _element_ ] is a canvas element.
    else if (_element_.nodeName && _element_.nodeName.toLowerCase() === 'canvas') {
        // Destroy existing chart.
        if (_element_.hasOwnProperty('chart'))
            _element_.chart.destroy();

        canvas = _element_;
    }
    // Create a canvas element.
    else {
        const newCanvas = document.createElement('canvas');
        const oldCanvas = _element_.getElementsByTagName('canvas')[0];

        if (oldCanvas !== undefined) {
            // Destroy existing chart.
            if (oldCanvas.hasOwnProperty('chart'))
                oldCanvas.chart.destroy();

            oldCanvas.replaceWith(newCanvas);
        } else {
            _element_.appendChild(newCanvas);
        }

        canvas = newCanvas;
    }

    config.hoverEvent = addCustomHoverEvent(canvas, config.hoverCallback);
    config.clickEvent = addCustomClickEvent(canvas, config.clickCallback);

    return canvas;
}
