import Chart from "chart.js/auto";
import addCanvas from "./util/addCanvas";
import configure from "./barPlot/configure";
import structureBarData from "./barPlot/structureBarData";
import defineBarPlugins from "./barPlot/defineBarPlugins";
import getBarScales from "./barPlot/getBarScales";
import updateBarData from "./barPlot/updateBarData";
import updateBarConfig from "./barPlot/updateBarConfig";
import updateBarOption from "./barPlot/updateBarOption";
import generateLegend from "./util/generateLegend";
import onClick from "./scatterPlot/onClick";
import onHover from "./scatterPlot/onHover";

export default function barPlot(
  _element_,
  _data_,
  _config_ = {},
  bounds = null
) {
  const canvas = addCanvas(_element_);

  // Update config.
  const config = configure(_config_);

  // Define array of input datasets to chart.
  const datasets = structureBarData(_data_, config);

  // Define plugins (title, tooltip) and scales (x, y).
  const options = {
    animation: false,
    events: ["click", "mousemove", "mouseout"],
    onClick,
    onHover,
    plugins: defineBarPlugins(config),
    scales: getBarScales(config),
  };

  const customLegend = {
    id: "customLegend",
    afterDraw(chart, args, options) {
      generateLegend(chart, ".chartBox");
    },
  };

  const chart = new Chart(canvas, {
    data: {
      datasets,
      config,
    },
    options,
    plugins: [customLegend],
  });

  chart.helpers = {
    updateBarData: updateBarData,
    updateBarConfig: updateBarConfig,
    updateBarOption: updateBarOption,
  };

  return chart;
}
