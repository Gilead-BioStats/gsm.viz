import { rollups, ascending } from 'd3';

export default function structureData(_data_, config) {
    const grouped = rollups(
        _data_.sort((a, b) => ascending(a.snapshot_date, b.snapshot_date)),
        (group) => group.map((d) => +d.score),
        (d) => d.snapshot_date
    );

    const data = {
        labels: grouped.map((d) => d[0]),
        datasets: [
            {
                //label: 'Score',
                //backgroundColor: 'rgba(0,0,255,0.5)',
                //borderColor: 'blue',
                //borderWidth: 1,
                //outlierColor: '#999999',
                //padding: 10,
                //itemRadius: 0,
                data: grouped.map((d) => d[1]),
            },
        ],
    };

    return data;
}
