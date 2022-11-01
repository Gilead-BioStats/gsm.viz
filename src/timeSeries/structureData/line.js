export default function line(_data_, config, labels) {
    const lineData = _data_
        .filter((d) => config.selectedGroupIDs.includes(d.groupid))
        .map((d, i) => {
            const datum = { ...d };
            datum.x = datum[config.x]; //labels
            //.findIndex(label => label === datum[config.x]);
            datum.y = +datum[config.y];
            return datum;
        });

    const dataset = {
        type: 'line',
        data: lineData,
        backgroundColor: 'rgba(0,0,255,.75)',
        borderColor: 'rgba(0,0,255,.25)',
    };

    return dataset;
}
