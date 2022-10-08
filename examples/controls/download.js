// Add event listener to download button.
const download = function () {
    const instance = getChart();
    const downloadButton = document.getElementById('download');

    downloadButton.onclick = () => {
        const a = document.createElement('a');
        a.href = instance.toBase64Image();
        a.download = 'scatter-plot.png';
        a.click();
    };
};
