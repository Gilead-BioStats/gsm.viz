import React, { useRef, useEffect } from "react";
import rbm from "rbm-viz";
import PropTypes from "prop-types";

const generateKey = () => {
  return `${new Date().getTime()}`;
};

const ScatterPlot = ({ data, config, bonds }) => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      rbm.scatterPlot(container.current, data, config, bonds);
    }
  }, [data, config, bonds]);
  return <div ref={container} key={generateKey()}></div>;
};

ScatterPlot.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  bonds: PropTypes.array,
};

ScatterPlot.defaultProps = {
  data: [],
  config: {},
  bonds: [],
};

export { ScatterPlot };
