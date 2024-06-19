const getSites = function(results) {
    const siteSubset = document.querySelector('#site-subset');

    // filter array on unique values
    const unique = (value, index, self) => self.indexOf(value) === index;

    let sites;
    switch (siteSubset.value) {
        case 'red':
            sites = [...new Set(results
                .filter((d) => Math.abs(parseInt(d.flag)) === 2)
                .map((d) => d.groupid)
            )];
            break;
        case 'amber':
            sites = [...new Set(results
                .filter((d) => Math.abs(parseInt(d.flag)) === 1)
                .map((d) => d.groupid)
            )];
            break;
        case 'red-amber':
            sites = [...new Set(results
                .filter((d) => Math.abs(parseInt(d.flag)) >= 1)
                .map((d) => d.groupid)
            )];
            break;
        default:
            sites = [...new Set(
                results.map((d) => d.groupid)
            )];
    }

    return sites;
}
