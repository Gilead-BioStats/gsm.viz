import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const BarChart = ({ data, config, thresholds, setInstance }) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            const inst = rbm.barChart(container.current, data, config, thresholds)
            console.log(inst)
            //setInstance(inst)
        }
    }, [data, config, thresholds, setInstance]);

    return (
        <div
            ref={container}
            key={generateKey()}
            style={{ width: '90%', height: '40vh', display: 'inline-block' }}
        ></div>
    );
};

BarChart.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
    thresholds: PropTypes.array,
};

BarChart.defaultProps = {
    data: [],
    config: {},
    thresholds: [],
};

export default BarChart;