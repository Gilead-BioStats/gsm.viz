import addCustomHoverEvent from './addCanvas/addCustomHoverEvent';
import addCustomClickEvent from './addCanvas/addCustomClickEvent';

export default function addCanvas(_element_, config) {
    let canvas;

    if (!document.body.contains(_element_)) { // [ _element_ ] doesn't exist
        console.error('addCanvas: [ _element_ ] does not exist.');
        return;
    } else if (_element_.nodeName && _element_.nodeName === 'CANVAS') { // [ _element_ ] is a canvas element
        canvas = _element_;
    } else { // create a canvas element
        const newCanvas = document.createElement('canvas');
        const oldCanvas = _element_.getElementsByTagName('canvas')[0];

        if (oldCanvas !== undefined) {
            oldCanvas.replaceWith(newCanvas);
        } else {
            _element_.appendChild(newCanvas);
        }

        canvas = newCanvas;
    }

    config.hoverEvent = addCustomHoverEvent(canvas, config.hoverCallback);
    config.clickEvent = addCustomClickEvent(canvas, config.clickCallback);

    console.log(canvas);

    return canvas;
}
