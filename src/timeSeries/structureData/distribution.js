import getBoxplot from './distribution/boxplot';
import getViolin from './distribution/violin';

export default function distribution(data, config, labels) {
    if (!['boxplot', 'violin'].includes(config.type)) return null;

    const dataset =
        config.type === 'boxplot'
            ? getBoxplot(data, config, labels)
            : config.type === 'violin'
            ? getViolin(data, config, labels)
            : null;

    return dataset;
}
