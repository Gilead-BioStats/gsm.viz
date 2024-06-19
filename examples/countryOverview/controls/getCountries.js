const getCountries = function(results) {
    const countrySubset = document.querySelector('#country-subset');

    let countries;
    switch (countrySubset.value) {
        case 'red':
            countries = [...new Set(results
                .filter((d) => Math.abs(parseInt(d.flag)) === 2)
                .map((d) => d.groupid)
            )];
            break;
        case 'amber':
            countries = [...new Set(results
                .filter((d) => Math.abs(parseInt(d.flag)) === 1)
                .map((d) => d.groupid)
            )];
            break;
        case 'red-or-amber':
            countries = [...new Set(results
                .filter((d) => Math.abs(parseInt(d.flag)) >= 1)
                .map((d) => d.groupid)
            )];
            break;
        default:
            countries = [...new Set(
                results.map((d) => d.groupid)
            )];
    }

    return countries;
}
