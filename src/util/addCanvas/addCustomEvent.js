import getCallbackWrapper from './getCallbackWrapper.js';

export default function addCustomEvent(canvas, callback, eventType) {
    const callbackWrapper = getCallbackWrapper(callback);
    const eventID = `${eventType}-event`;

    canvas.removeEventListener(eventID, callback, false);

    const customEvent = new Event(eventID, { bubbles: true } );

    canvas.addEventListener(eventID, callback, false);

    return customEvent;
}
