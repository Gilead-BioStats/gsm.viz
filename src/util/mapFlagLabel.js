export default function mapFlagLabel(flag) {
    if ((flag === 2) | (flag === -2)) {
        return 'Flagged Sites';
    } else if ((flag === 1) | (flag === -1)) {
        return 'At Risk Sites';
    } else {
        return 'Sites Not Flagged Or At Risk';
    }
}
