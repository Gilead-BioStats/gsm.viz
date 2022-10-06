const download = function (instance) {
    const downloadButton = document.getElementById('download');

    downloadButton.onclick = () => {
        console.log(instance);
        const a = document.createElement('a');
        a.href = instance.toBase64Image();
        a.download = 'scatter-plot.png';
        a.click();
    };
};
