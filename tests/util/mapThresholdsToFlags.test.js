import mapThresholdsToFlags from '../../src/util/mapThresholdsToFlags';

describe('map thresholds to flags', () => {
    test('same number of flags returned as number of thresholds', () => {
        expect(mapThresholdsToFlags([-3, -2, 0, 2, 3]).length).toEqual(5);
    });

    test('thresholds are sorted', () => {
        expect(
            mapThresholdsToFlags([0, -2, 2, -3, 3]).map(
                (flag) => flag.threshold
            )
        ).toEqual([-3, -2, 0, 2, 3]);
    });

    test('positive thresholds are mapped appropriately', () => {
        expect(
            mapThresholdsToFlags([3, 2, 0]).map((flag) => flag.flag)
        ).toEqual([0, 1, 2]);
    });

    test('negative thresholds are mapped appropriately', () => {
        expect(
            mapThresholdsToFlags([0, -2, -3]).map((flag) => flag.flag)
        ).toEqual([-2, -1, 0]);
    });

    test('incomplete thresholds are mapped appropriately', () => {
        expect(
            mapThresholdsToFlags([2, 0, -2, -3]).map((flag) => flag.flag)
        ).toEqual([-2, -1, 0, 1]);
    });
});
