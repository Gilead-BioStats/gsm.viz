const getSites = function (results) {
    const siteSubset = document.querySelector('#site-subset');

    let sites;
    switch (siteSubset.value) {
        case 'red':
            sites = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.Flag)) === 2)
                        .map((d) => d.GroupID)
                ),
            ];
            break;
        case 'amber':
            sites = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.Flag)) === 1)
                        .map((d) => d.GroupID)
                ),
            ];
            break;
        case 'red-or-amber':
            sites = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.Flag)) >= 1)
                        .map((d) => d.GroupID)
                ),
            ];
            break;
        default:
            sites = [...new Set(results.map((d) => d.GroupID))];
    }

    return sites;
};
