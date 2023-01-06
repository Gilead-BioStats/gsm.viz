import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const ScatterPlot = ({
    data,
    config,
    bounds,
    style = {
        width: '33%',
        height: '20vw',
        display: 'inline-block'
    }
}) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            rbm.scatterPlot(container.current, data, config, bounds);
        }
    }, [data, config, bounds]);

    return (
        <div
            ref={container}
            key={generateKey()}
            style={{ ...style }}
        ></div>
    );
};

ScatterPlot.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
    bounds: PropTypes.array,
};

ScatterPlot.defaultProps = {
    data: [],
    config: {},
    bounds: [],
};

export { ScatterPlot };
