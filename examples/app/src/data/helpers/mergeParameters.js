export default function mergeParameters(defaultParameters, customParameters) {
    const dates = [
        ...new Set(
            customParameters.map((parameter) => parameter.gsm_analysis_date)
        ),
    ];

    const parametersOverTime = dates
        .map((date) => {
            const parameters = defaultParameters.map((defaultParameter) => {
                const customParameter = customParameters.find(
                    (customParameter) =>
                        customParameter.gsm_analysis_date === date &&
                        customParameter.MetricID ===
                            defaultParameter.MetricID &&
                        customParameter.index === defaultParameter.index
                );

                const parameter = {
                    ...defaultParameter,
                    ...customParameter,
                };

                parameter.gsm_analysis_date = date;
                parameter.SnapshotDate = date;
                parameter.value =
                    customParameter !== undefined
                        ? customParameter.value
                        : defaultParameter.default;
                delete parameter.default;
                delete parameter.configurable;

                return parameter;
            });

            return parameters;
        })
        .flatMap((parameters) => parameters);

    return parametersOverTime;
}
