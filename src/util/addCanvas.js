import addCustomHoverEvent from './addCanvas/addCustomHoverEvent';
import addCustomClickEvent from './addCanvas/addCustomClickEvent';

export default function addCanvas(_element_, config) {
    if (!document.body.contains(_element_)) {
        console.error('addCanvas: [ _element_ ] does not exist.');
        return;
    } else if (_element_.nodeName && _element_.nodeName === 'CANVAS') {
        return _element_;
    }

    const newCanvas = document.createElement('canvas');
    const oldCanvas = _element_.getElementsByTagName('canvas')[0];
    if (canvas !== undefined) {
        oldCanvas.replaceWith(newCanvas);
    } else {
        _element_.appendChild(newCanvas);
    }

    config.hoverEvent = addCustomHoverEvent(canvas, config.hoverCallback);
    config.clickEvent = addCustomClickEvent(canvas, config.clickCallback);
    console.log(canvas);

    return newCanvas;
}
