import updateBarConfig from './updateBarConfig';
import updateBarPlugin from './updateBarPlugins';
import structureBarData from './structureBarData';

export default function updateBarData(chart, _data_, _config_) {
    chart.data.config = updateBarConfig(chart, _config_);
    chart.data.datasets = structureBarData(_data_, chart.data.config);
    console.log(_config_.selectedGroupIDs);
    //chart.options.inliner_count = data.inliner_count;
    chart.update();
}
