export default function deriveSiteMetrics(sites, results) {
    const missingSites = results
        .map((result) => result.GroupID)
        .filter((GroupID) => !sites.find((site) => site.SiteID === GroupID))
        .map((SiteID) => ({ SiteID }));

    const allSites = sites.concat(missingSites);

    allSites.forEach((site) => {
        const siteResults = results.filter(
            (result) => result.GroupID === site.SiteID
        );

        // count red flags
        site.nRedFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.Flag)) === 2
        ).length;

        // count amber flags
        site.nAmberFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.Flag)) === 1
        ).length;

        // count green flags
        site.nGreenFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.Flag)) === 0
        ).length;
    });

    return allSites;
}
