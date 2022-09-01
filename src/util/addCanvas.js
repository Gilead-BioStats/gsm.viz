export default function addCanvas(el) {
    if (!document.body.contains(el)) {
        console.error('addCanvas: [ el ] does not exist.');
        return;
    }

    const canvas = document.createElement('canvas');
    el.appendChild(canvas);

    return canvas;
}
