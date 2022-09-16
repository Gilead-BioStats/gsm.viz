import colors from './colors';

export default function mapFlagColor(flag) {
    if ((flag === 2) | (flag === -2)) {
        return colors.colors.red;
    } else if ((flag === 1) | (flag === -1)) {
        return colors.colors.yellow;
    } else {
        return colors.colors.green;
    }
}
