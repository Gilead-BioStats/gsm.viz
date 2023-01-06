import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const TimeSeries = ({
    data,
    config,
    thresholds,
    intervals,
    style = {
        width: '100%',
        height: '50vh',
        display: 'block'
    }
}) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            rbm.timeSeries(
                container.current,
                data,
                config,
                thresholds,
                intervals
            );
        }
    }, [data, config, thresholds, intervals]);

    return (
        <div
            ref={container}
            key={generateKey()}
            style={{ ...style }}
        ></div>
    );
};

TimeSeries.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
    thresholds: PropTypes.array,
    intervals: PropTypes.array,
};

TimeSeries.defaultProps = {
    data: [],
    config: {},
    thresholds: [],
    intervals: [],
};

export { TimeSeries };
