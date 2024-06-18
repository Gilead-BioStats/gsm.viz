const getSites = function(results) {
    const siteSubset = document.querySelector('#site-subset');

    // filter array on unique values
    const unique = (value, index, self) => self.indexOf(value) === index;

    let sites;
    switch (siteSubset.value) {
        case 'red':
            sites = results
                .filter((d) => Math.abs(parseInt(d.flag)) === 2)
                .map((d) => d.groupid)
                .filter(unique);
            break;
        case 'amber':
            sites = results
                .filter((d) => Math.abs(parseInt(d.flag)) === 1)
                .map((d) => d.groupid)
                .filter(unique);
            break;
        case 'red-amber':
            sites = results
                .filter((d) => Math.abs(parseInt(d.flag)) >= 1)
                .map((d) => d.groupid)
                .filter(unique);
            break;
        default:
            sites = results.map((d) => d.groupid).filter(unique);
    }

    return sites;
}
