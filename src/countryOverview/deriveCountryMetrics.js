export default function deriveCountryMetrics(countries, results) {
    const missingCountries = results
        .map((result) => result.groupid)
        .filter((groupid) => !countries.find((country) => country.groupid === groupid))
        .map((groupid) => ({ groupid }));

    const allCountries = countries.concat(missingCountries);

    allCountries.forEach((country) => {
        const countryResults = results.filter((result) => result.groupid === country.groupid);

        // coun red flags
        country.nRedFlags = countryResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 2
        ).length;

        // count amber flags
        country.nAmberFlags = countryResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 1
        ).length;

        // count green flags
        country.nGreenFlags = countryResults.filter(
            (result) => Math.abs(parseInt(result.flag)) === 0
        ).length;
    });

    return allCountries;
};

