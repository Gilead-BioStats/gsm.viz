import updateConfig from './updateConfig';
import addCustomEvent from '../util/addCanvas/addCustomEvent';
import structureData from './structureData';

export default function updateData(chart, _data_, _config_, _thresholds_) {
    // To avoid attaching duplicate event listeners the callback must not change.
    const hoverCallbackWrapper = chart.data.config.hoverCallbackWrapper;
    _config_.hoverCallbackWrapper = hoverCallbackWrapper;

    const clickCallbackWrapper = chart.data.config.clickCallbackWrapper;
    _config_.clickCallbackWrapper = clickCallbackWrapper;

    chart.data.config = updateConfig(chart, _config_, _thresholds_);

    // TODO: figure out why these events have to be redefined on data change
    chart.data.config.hoverEvent = addCustomEvent(
        chart.canvas,
        hoverCallbackWrapper,
        'hover'
    );
    chart.data.config.clickEvent = addCustomEvent(
        chart.canvas,
        clickCallbackWrapper,
        'click'
    );
    chart.data.datasets = structureData(_data_, chart.data.config);
    chart.update();
}
