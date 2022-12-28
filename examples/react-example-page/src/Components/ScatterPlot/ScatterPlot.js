import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const ScatterPlot = ({ data, config, bounds, setInstance }) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            const inst = rbm.scatterPlot(container.current, data, config, bounds)
            setInstance(inst)
        }
    }, [data, config, bounds, setInstance]);

    return (
        <div
            ref={container}
            //key={generateKey()}
            style={{ width: '90%', height: '40vh', display: 'inline-block' }}
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
    bounds: []
};

export default ScatterPlot;
