import addCustomHoverEvent from './addCanvas/addCustomHoverEvent';
import addCustomClickEvent from './addCanvas/addCustomClickEvent';

export default function addCanvas(_element_, config) {
    if (!document.body.contains(_element_)) {
        console.error('addCanvas: [ _element_ ] does not exist.');
        return;
    } else if (_element_.nodeName && _element_.nodeName === 'CANVAS') {
        return _element_;
    }

    let canvas = _element_.getElementsByTagName('canvas');
    if (canvas.length) canvas[0].remove();

    canvas = document.createElement('canvas');
    _element_.appendChild(canvas);

    config.hoverEvent = addCustomHoverEvent(canvas, config.hoverCallback);
    config.clickEvent = addCustomClickEvent(canvas, config.clickCallback);

    return canvas;
}
