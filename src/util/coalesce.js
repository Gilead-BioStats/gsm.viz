export default function coalesce(customSetting, defaultSetting) {
    if ([null, undefined].includes(customSetting)) {
        return defaultSetting;
    }

    if (typeof defaultSetting === 'string' && customSetting === '') {
        return defaultSetting;
    }

    if (Array.isArray(defaultSetting) && !Array.isArray(customSetting)) {
        customSetting = [customSetting];
    }

    if (Array.isArray(defaultSetting) && Array.isArray(customSetting) && customSetting[0] === '') {
        return defaultSetting;
    }

    return customSetting;
}
