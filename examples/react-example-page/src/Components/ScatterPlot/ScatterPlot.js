import React, { useRef, useEffect } from 'react';
import rbm from 'rbm-viz';
import PropTypes from 'prop-types';

const ScatterPlot = ({
    data,
    config,
    bounds,
    xAxis,
    selectedGroup,
    setInstance,
}) => {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            // create chart
            const inst = rbm.scatterPlot(
                container.current,
                data,
                config,
                bounds
            );

            // x-axis scale
            inst.config.options.scales.x.type = xAxis.type;

            // x-axis label
            if (!xAxis.isLog) {
                inst.config.options.scales.x.title.text =
                    inst.config.options.scales.x.title.text.replace(
                        ' (Log Scale)',
                        ''
                    );
            }

            // highlight selected group
            inst.data.config.selectedGroupIDs = selectedGroup;

            // TODO - Paritosh said we might not need this, looks like we do? Why?
            inst.update();
            setInstance(inst);
        }
    }, [data, config, bounds, xAxis, setInstance, selectedGroup]);

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
    bounds: [],
};

export default ScatterPlot;
