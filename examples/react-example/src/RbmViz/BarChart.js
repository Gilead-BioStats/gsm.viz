import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const BarChart = ({ data, config, thresholds }) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            rbm.barChart(container.current, data, config, thresholds);
        }
    }, [data, config, thresholds]);

    return (
        <div
            ref={container}
            key={generateKey()}
            style={{ width: '33%', height: '300px', display: 'inline-block' }}
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

export { BarChart };
