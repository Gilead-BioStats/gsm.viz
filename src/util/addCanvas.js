export default function addCanvas(el) {
    if (!document.body.contains(el)) {
        console.error('addCanvas: [ el ] does not exist.');
        return;
    } else if (el.nodeName && el.nodeName === 'CANVAS') {
        return el;
    }

    const canvas = document.createElement('canvas');
    el.appendChild(canvas);

    return canvas;
}
