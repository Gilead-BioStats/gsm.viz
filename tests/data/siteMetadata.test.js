import sites from '../../examples/data/status_site.json';
import schema from '../../src/data/schema/siteMetadata.json';
import checkInput from '../../src/data/checkInput';
import getType from '../../src/data/checkInput/getType';

describe('sites schema', () => {
    test('sites schema type matches data type of sites', () => {
        let resultsType = typeof sites;

        if (resultsType === 'object' && Array.isArray(sites))
            resultsType = 'array';

        expect(resultsType).toBe(schema.type);
    });

    test('type of sites schema items matches data type of sites items', () => {
        const site = sites[Math.floor(sites.length * Math.random())];

        expect(typeof site).toBe(schema.items.type);
    });

    test('properties of sites schema items match properties of sites items', () => {
        const site = sites[Math.floor(sites.length * Math.random())];
        const propsSchema = Object.keys(schema.items.properties).sort();
        const propsResult = Object.keys(site).sort().filter(prop => propsSchema.includes(prop));

        expect(propsResult).toEqual(propsSchema);
    });
});
