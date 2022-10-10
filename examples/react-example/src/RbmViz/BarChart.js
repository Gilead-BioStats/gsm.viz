import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const BarChart = ({ data, config }) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            rbm.barChart(container.current, data, config);
        }
    }, [data, config]);

    return (
        <div
            ref={container}
            key={generateKey()}
            style={{ width: '49.5%', display: 'inline-block' }}
        ></div>
    );
};

BarChart.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
};

BarChart.defaultProps = {
    data: [],
    config: {},
};

export { BarChart };
