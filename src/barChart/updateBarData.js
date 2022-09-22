import updateBarConfig from './updateBarConfig';
import structureBarData from './structureBarData';

export default function updateBarData(chart, _data_, _config_, isChecked) {
    chart.data.config = updateBarConfig(chart, _config_);
    chart.data.datasets = structureBarData(
        _data_,
        chart.data.config,
        isChecked
    );
    chart.update();
}
