import getDefaultScales from '../util/getDefaultScales';

export default function getScales(config, datasets) {
    const scales = getDefaultScales();

    //// Determine x-axis padding to prevent clipping.
    //const data =

    // x
    scales.x.ticks.display = false;
    scales.x.title.text = config.xLabel;
    scales.x.type = config.xType;
    //scales.x.title.padding = {
    //    bottom: 100,
    //};

    // y
    scales.y.title.text = config.yLabel;
    scales.y.type = config.yType;
    scales.y.offset = true;

    return scales;
}
