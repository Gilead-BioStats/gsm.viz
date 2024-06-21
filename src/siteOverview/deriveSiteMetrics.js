export default function deriveSiteMetrics(sites, results) {
    const missingSites = results
        .map((result) => result.groupid)
        .filter((siteid) => !sites.find((site) => site.siteid === siteid))
        .map((siteid) => ({ siteid }));

    const allSites = sites.concat(missingSites);

    allSites.forEach((site) => {
        const siteResults = results.filter(
            (result) => result.groupid === site.siteid
        );

        // count red flags
        site.nRedFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 2
        ).length;

        // count amber flags
        site.nAmberFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 1
        ).length;

        // count green flags
        site.nGreenFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 0
        ).length;
    });

    return allSites;
}
