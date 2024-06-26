const getCountries = function (results) {
    const countrySubset = document.querySelector('#country-subset');

    let countries;
    switch (countrySubset.value) {
        case 'red':
            countries = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.Flag)) === 2)
                        .map((d) => d.GroupID)
                ),
            ];
            break;
        case 'amber':
            countries = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.Flag)) === 1)
                        .map((d) => d.GroupID)
                ),
            ];
            break;
        case 'red-or-amber':
            countries = [
                ...new Set(
                    results
                        .filter((d) => Math.abs(parseInt(d.Flag)) >= 1)
                        .map((d) => d.GroupID)
                ),
            ];
            break;
        default:
            countries = [...new Set(results.map((d) => d.GroupID))];
    }

    return countries;
};
