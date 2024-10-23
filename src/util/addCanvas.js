import addCustomEvent from './addCanvas/addCustomEvent.js';

export default function addCanvas(_element_, config) {
    let canvas;

    // [ _element_ ] doesn't exist.
    //if (!document.body.contains(_element_)) {
    //    console.error('addCanvas: [ _element_ ] does not exist.');

    //    return;
    //}
    // [ _element_ ] is a canvas element.
    //else
    if (_element_.nodeName && _element_.nodeName.toLowerCase() === 'canvas') {
        // Destroy existing chart.
        if (_element_.hasOwnProperty('chart')) _element_.chart.destroy();

        canvas = _element_;
    }
    // Create a canvas element.
    else {
        const newCanvas = document.createElement('canvas');
        const oldCanvas = _element_.getElementsByTagName('canvas')[0];

        if (oldCanvas !== undefined) {
            // Destroy existing chart.
            if (oldCanvas.hasOwnProperty('chart')) oldCanvas.chart.destroy();

            oldCanvas.replaceWith(newCanvas);
        } else {
            _element_.appendChild(newCanvas);
        }

        canvas = newCanvas;
    }

    // Attach custom hover and click events to canvas element.
    canvas.hoverEvent = addCustomEvent(
        canvas,
        config.hoverCallbackWrapper,
        'hover'
    );
    canvas.clickEvent = addCustomEvent(
        canvas,
        config.clickCallbackWrapper,
        'click'
    );

    // Add custom event listener that bubbles and returns only the key data associated with a risk
    // signal.
    canvas.riskSignalSelected = new CustomEvent('riskSignalSelected', {
        bubbles: true,
    });

    return canvas;
}
