export default function displayWhiteBackground() {
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        },
    };

    return plugin;
}
