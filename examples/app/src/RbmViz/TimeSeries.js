import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const TimeSeries = ({ data, config, thresholds }) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            rbm.timeSeries(container.current, data, config, thresholds);
        }
    }, [data, config, thresholds]);

    return (
        <div
            ref={container}
            key={generateKey()}
            style={{ width: '100%', height: '50vh', display: 'block' }}
        ></div>
    );
};

TimeSeries.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
    thresholds: PropTypes.array,
};

TimeSeries.defaultProps = {
    data: [],
    config: {},
    thresholds: [],
};

export { TimeSeries };
