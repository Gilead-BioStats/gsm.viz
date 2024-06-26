export default function deriveGroupMetrics(groups, results) {
    const missingGroups = results
        .map((result) => result.GroupID)
        .filter(
            (GroupID) =>
                !groups.find((group) => group.GroupID === GroupID)
        )
        .map((GroupID) => ({ GroupID }));

    const allGroups = groups.concat(missingGroups);

    allGroups.forEach((group) => {
        const groupResults = results.filter(
            (result) => result.GroupID === group.GroupID
        );

        // count red flags
        group.nRedFlags = groupResults.filter(
            (result) => Math.abs(parseInt(result.Flag)) === 2
        ).length;

        // count amber flags
        group.nAmberFlags = groupResults.filter(
            (result) => Math.abs(parseInt(result.Flag)) === 1
        ).length;

        // count green flags
        group.nGreenFlags = groupResults.filter(
            (result) => Math.abs(parseInt(result.Flag)) === 0
        ).length;
    });

    return allGroups;
}
