const mergeParameters = function (defaultParameters, customParameters) {
    const dates = [
        ...new Set(
            customParameters.map((parameter) => parameter.SnapshotDate)
        ),
    ];

    const parametersOverTime = dates
        .map((date) => {
            const parameters = defaultParameters.map((defaultParameter) => {
                const customParameter = customParameters.find(
                    (customParameter) =>
                        customParameter.SnapshotDate === date &&
                        customParameter.MetricID ===
                            defaultParameter.MetricID &&
                        customParameter.index === defaultParameter.index
                );

                const parameter = {
                    ...defaultParameter,
                    ...customParameter,
                };

                parameter.SnapshotDate = date;
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
};
