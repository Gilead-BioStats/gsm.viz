import getCallbackWrapper from './getCallbackWrapper';

export default function addCustomEvent(canvas, callback, eventType) {
    const callbackWrapper = getCallbackWrapper(callback);
    const eventID = `${eventType}-event`;

    canvas.removeEventListener(eventID, callback, false);

    const customEvent = new Event(eventID);

    canvas.addEventListener(eventID, callback, false);

    return customEvent;
}
