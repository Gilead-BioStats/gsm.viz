import getDefaultScales from '../util/getDefaultScales.js';

export default function getScales(config, datasets) {
    const scales = getDefaultScales();

    // x
    scales.x.ticks.display = false;
    scales.x.title.text = config.xLabel;
    scales.x.type = config.xType;

    // y
    scales.y.title.text = config.yLabel;
    scales.y.type = config.yType;
    scales.y.offset = true;

    return scales;
}
