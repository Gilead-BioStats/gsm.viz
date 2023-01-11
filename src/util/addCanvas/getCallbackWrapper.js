export default function getCallbackWrapper(callback) {
    const callbackWrapper = function(event) {
        const pointDatum = event.data;

        callback(pointDatum);

        return pointDatum;
    };

    return callbackWrapper;
}
