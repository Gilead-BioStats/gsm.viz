const mergeParameters = function (defaultParameters, customParameters) {
    const parameters = defaultParameters.map((defaultParameter) => {
        const parameter = { ...defaultParameter };

        const customParameter = customParameters.find(
            (customParameter) =>
                customParameter.workflowid === parameter.workflowid &&
                customParameter.index === parameter.index
        );

        parameter.value =
            customParameter !== undefined
                ? customParameter.value
                : parameter.default;

        delete parameter.default;
        delete parameter.configurable;

        return parameter;
    });

    return parameters;
};
