import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const TSContinuous = ({ data, config, parameters, setInstance}) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            
            const inst = rbm.timeSeries(container.current, data, config, parameters)

            // TODO - Paritosh said we might not need this, looks like we do? Why?
            inst.update()
            setInstance(inst)
        }
    }, [data, config, parameters, setInstance]);

    return (
        <div
            ref={container}
            //key={generateKey()}
            style={{ width: '90%', height: '40vh', display: 'inline-block' }}
        ></div>
    );
};

TSContinuous.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
    parameters: PropTypes.array,
};

TSContinuous.defaultProps = {
    data: [],
    config: {},
    parameters: []
};

export default TSContinuous;
