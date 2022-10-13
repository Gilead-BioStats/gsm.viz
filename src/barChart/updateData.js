import updateConfig from './updateConfig';
import addCustomHoverEvent from '../util/addCanvas/addCustomHoverEvent';
import addCustomClickEvent from '../util/addCanvas/addCustomClickEvent';
import structureData from './structureData';

export default function updateData(
    chart,
    _data_,
    _config_,
    thresholds = false,
    yaxis = 'score'
) {
    chart.data.config = updateConfig(chart, _config_, thresholds, yaxis);
    // TODO: figure out why these events have to be redefined on data change
    chart.data.config.hoverEvent = addCustomHoverEvent(
        chart.canvas,
        chart.data.config.hoverCallback
    );
    chart.data.config.clickEvent = addCustomClickEvent(
        chart.canvas,
        chart.data.config.clickCallback
    );
    chart.data.datasets = structureData(_data_, chart.data.config);
    chart.update();
}
