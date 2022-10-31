import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const generateKey = () => {
    return `${new Date().getTime()}`;
};

const Sparkline = ({ data, config }) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            rbm.sparkline(container.current, data, config);
        }
    }, [data, config]);

    return (
        <div
            ref={container}
            key={generateKey()}
            style={{
                width: '12.5%',
                margin: 'auto',
                height: '50px',
                display: 'inline-block',
            }}
        ></div>
    );
};

Sparkline.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
};

Sparkline.defaultProps = {
    data: [],
    config: {},
};

export { Sparkline };
