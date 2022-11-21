import { ascending } from 'd3';

export default function mutate(_data_, config) {
    return _data_.sort(
        (a, b) => ascending(a[config.x], b[config.x])
    );
}
