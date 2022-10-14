import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const ScatterPlot = ({ data, config, bounds }) => {
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
            style={{ width: '49.5%', height: '300px', display: 'inline-block' }}
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
