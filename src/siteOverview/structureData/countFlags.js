export default function countFlags(site, value) {
        const siteResults = Array.from(value, ([key, value]) => value[0]);
        site.nRedFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 2
        ).length;
        site.nAmberFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 1
        ).length;
        site.nGreenFlags = siteResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 0
        ).length;

    return site;
};

