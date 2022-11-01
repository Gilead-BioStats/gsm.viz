import { rollups, ascending } from 'd3';

export default function boxplot(_data_, config) {
    const grouped = rollups(
        _data_,
        (group) => group.map((d) => +d[config.y]),
        (d) => d.snapshot_date
    );

    const dataset = {
        type: 'boxplot',
        //label: 'Score',
        //backgroundColor: 'rgba(0,0,255,0.5)',
        //borderColor: 'blue',
        //borderWidth: 1,
        //outlierColor: '#999999',
        //padding: 10,
        //itemRadius: 0,
        data: grouped.map((d) => d[1]),
    };

    return dataset;
}
