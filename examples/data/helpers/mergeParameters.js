const mergeParameters = function (defaultParameters, customParameters) {
    const dates = [
        ...new Set(customParameters.map((parameter) => parameter.SnapshotDate)),
    ];

    const parametersOverTime = dates
        .map((date) => {
            const parameters = defaultParameters.map((defaultParameter) => {
                const customParameter = customParameters.find(
                    (customParameter) =>
                        customParameter.SnapshotDate === date &&
                        customParameter.MetricID ===
                            defaultParameter.MetricID &&
                        customParameter.Index === defaultParameter.Index
                );

                const parameter = {
                    ...defaultParameter,
                    ...customParameter,
                };

                parameter.SnapshotDate = date;
                parameter.SnapshotDate = date;
                parameter.Value =
                    customParameter !== undefined
                        ? customParameter.Value
                        : defaultParameter.Default;
                delete parameter.Default;
                delete parameter.Configurable;

                return parameter;
            });

            return parameters;
        })
        .flatMap((parameters) => parameters);

    return parametersOverTime;
};
