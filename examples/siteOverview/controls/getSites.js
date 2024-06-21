const getSites = function (results) {
    const siteSubset = document.querySelector('#site-subset');

    let sites;
    switch (siteSubset.value) {
        case 'red':
            sites = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.flag)) === 2)
                        .map((d) => d.groupid)
                ),
            ];
            break;
        case 'amber':
            sites = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.flag)) === 1)
                        .map((d) => d.groupid)
                ),
            ];
            break;
        case 'red-or-amber':
            sites = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.flag)) >= 1)
                        .map((d) => d.groupid)
                ),
            ];
            break;
        default:
            sites = [...new Set(results.map((d) => d.groupid))];
    }

    return sites;
};
