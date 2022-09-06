import updateConfig from './updateConfig';
import structureData from './structureData';

export default function updateData(chart, _data_, _config_, bounds) {
    chart.data.config = updateConfig(chart, _config_);
    chart.data.datasets = structureData(
        _data_,
        chart.data.config,
        bounds
    );
    chart.update()
}
