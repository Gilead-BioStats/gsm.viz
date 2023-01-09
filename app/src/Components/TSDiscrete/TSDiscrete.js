import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const TSDiscrete = ({ data, config, setInstance }) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            const inst = rbm.timeSeries(container.current, data, config);

            // TODO - Paritosh said we might not need this, looks like we do? Why?
            inst.update();
            setInstance(inst);
        }
    }, [data, config, setInstance]);

    return (
        <div
            ref={container}
            //key={Math.random()}
            style={{ width: '90%', height: '40vh', display: 'inline-block' }}
        ></div>
    );
};

TSDiscrete.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
};

TSDiscrete.defaultProps = {
    data: [],
    config: {},
};

export default TSDiscrete;
