import updateConfig from './updateConfig';
import structureData from './structureData';

export default function updateData(chart, _data_, _config_, bounds) {
    chart.data.config = updateConfig(chart, _config_);

    // maybe we make this a class with methods based on the chart type?
    chart.data.datasets = structureData(_data_, chart.data.config, bounds);
    chart.update();
}
