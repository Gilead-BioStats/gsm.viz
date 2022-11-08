import getDefaultScales from '../util/getDefaultScales';
import { min, max } from 'd3';

// TODO: use some function of canvas height and point radius to define y-domain
export default function getScales(config, data) {
    const scales = getDefaultScales();

    // x
    scales.x.display = false;
    scales.x.type = config.xType;

    // Define y-domain.
    const yMin = min(data, (d) => d.y);
    const yMax = max(data, (d) => d.y);
    const range = yMin !== yMax
        ? yMax - yMin
        : yMin === yMax && yMin !== 0
        ? yMin
        : 1;

    // y
    scales.y.display = false;
    scales.y.min = yMin - range * 0.35;
    scales.y.max = yMax + range * 0.35;
    scales.y.type = config.yType;

    return scales;
}
