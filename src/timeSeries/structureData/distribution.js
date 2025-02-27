import getBoxplot from './distribution/boxplot.js';
import getViolin from './distribution/violin.js';

export default function distribution(data, config, labels) {
    if (!['boxplot', 'violin'].includes(config.distributionDisplay))
        return null;

    const dataset =
        config.distributionDisplay === 'boxplot'
            ? getBoxplot(data, config, labels)
            : config.distributionDisplay === 'violin'
            ? getViolin(data, config, labels)
            : null;

    return dataset;
}
