import updateBarConfig from './updateBarConfig';
import updateBarPlugin from './updateBarPlugins';
import structureBarData from './structureBarData';

export default function updateBarData(chart, _data_, _config_, isChecked) {
    chart.data.config = updateBarConfig(chart, _config_);
    let data = structureBarData(_data_, chart.data.config, isChecked);
    chart.data.datasets = data.data;
    chart.options.inliner_count = data.inliner_count;
    chart.update();
}
