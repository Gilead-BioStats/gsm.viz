import { ascending } from 'd3';

export default function mutate(_data_, config, _intervals_) {
    return _data_
        .map((d) => {
            const datum = { ...d };

            if (_intervals_ !== null) {
                const intervals = _intervals_.filter(
                    (interval) => interval.snapshot_date === datum.snapshot_date
                );
                datum.lowerCI = intervals.find(
                    (interval) => interval.param === 'LowCI'
                )?.value;
                datum.upperCI = intervals.find(
                    (interval) => interval.param === 'UpCI'
                )?.value;
            }

            return datum;
        })
        .sort((a, b) => ascending(a[config.x], b[config.x]));
}
