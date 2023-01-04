import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const TSCI = ({ data, config, parameters, analysis, setInstance}) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            
            const inst = rbm.timeSeries(container.current, data, config, parameters, analysis)

            // TODO - Paritosh said we might not need this, looks like we do? Why?
            inst.update()
            setInstance(inst)
        }
    }, [data, config, parameters, analysis, setInstance]);

    return (
        <div
            ref={container}
            //key={generateKey()}
            style={{ width: '90%', height: '40vh', display: 'inline-block' }}
        ></div>
    );
};

TSCI.propTypes = {
    data: PropTypes.array,
    config: PropTypes.object,
    parameters: PropTypes.array,
    analysis: PropTypes.array,
};

TSCI.defaultProps = {
    data: [],
    config: {},
    parameters: [],
    analysis: []
};

export default TSCI;
