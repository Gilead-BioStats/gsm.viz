import colorScheme from '../../util/colorScheme.js';

export default function annotations(config) {
    const annotations = config.thresholds
        ? config.thresholds
        : null;

    return annotations;
}
