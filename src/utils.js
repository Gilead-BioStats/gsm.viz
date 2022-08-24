export default function generateLegend() {
  // get selected location
  const chartBox = document.querySelector(".chartBox");

  // create div
  const div = document.createElement("DIV");
  div.setAttribute("id", "customLegend");

  chartBox.appendChild(div);
}
