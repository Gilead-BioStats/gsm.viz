import coalesce from './coalesce';

export default function configure(defaults, _config_, customSettings = null) {
    const config = { ..._config_ };

    for (const key in defaults) {
        config[ key ] = coalesce(config[ key ], defaults[ key ]);
    }

    if (customSettings !== null) {
        for (const key in customSettings) {
            config[ key ] = customSettings[ key ]();
        }
    }

    return config;
}
