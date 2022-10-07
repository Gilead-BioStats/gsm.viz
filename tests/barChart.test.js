import defineBarPlugins from "../src/barChart/defineBarPlugins"
import getBarScales from "../src/barChart/getBarScales"
import scriptableOptions from "../src/barChart/scriptableOptions"
import structureBarData from "../src/barChart/structureBarData"
import updateBarConfig from "../src/barChart/updateBarConfig"
import updateBarOption from "../src/barChart/updateBarOption"
import updateBarPlugins from "../src/barChart/updateBarPlugins"
import configure from "../src/barChart/configure"

let config = {
    workflowid: "kri0001",
    gsm_version: "1.1.0",
    group: "Site",
    metric: "Non-serious AE Reporting Rate",
    numerator: "Treatment Emergent AEs",
    denominator: "Days on Treatment",
    outcome: "Rate",
    model: "Poisson",
    score: "Residual from Poisson Model",
    data_inputs: "rawplus.ae, rawplus.subj",
    data_filters: "Non-Serious, TreatmentEmergent",
    selectedGroupIDs: [
        "160"
    ]
}

let data = [
    {
        "studyid": "AA-AA-000-0000",
        "workflowid": "kri0001",
        "groupid": "91",
        "numerator": "126",
        "denominator": "11534",
        "metric": "0.0109242240332929",
        "score": "7.9540229885143",
        "flag": "2"
    },
    {
        "studyid": "AA-AA-000-0000",
        "workflowid": "kri0001",
        "groupid": "75",
        "numerator": "106",
        "denominator": "7621",
        "metric": "0.0139089358351922",
        "score": "9.05626659281585",
        "flag": "0"
    },
    {
        "studyid": "AA-AA-000-0000",
        "workflowid": "kri0001",
        "groupid": "132",
        "numerator": "15",
        "denominator": "671",
        "metric": "0.022354694485842",
        "score": "4.44762014018215",
        "flag": "1"
    }
]

describe("config function suite", () => {

    test('config transforms raw config to chart.js', ()  => {
        let configured = configure(config)
        let config_keys = Object.keys(configured).sort()

        expect(config_keys).toEqual([
            "workflowid",
            "gsm_version",
            "group",
            "metric",
            "numerator",
            "denominator",
            "outcome",
            "model",
            "score",
            "data_inputs",
            "data_filters",
            "selectedGroupIDs",
            "type",
            "x",
            "xLabel",
            "y",
            "yLabel",
            "color",
            "colorLabel",
            "n",
            "nLabel",
            "num",
            "numeratorLabel",
            "denom",
            "denomionatorLabel",
            "threshold",
            "hoverCallback",
            "clickCallback",
            "maintainAspectRatio"
        ].sort())
    })
})

describe('structureBarData function suite', () => {
    let dataset = structureBarData(data, config)
    test('structureBarData returns single object', ()  => {
        expect(dataset.length).toBe(1)
    })

    test('structureBarData data length equal to data length', ()  => {
        expect(dataset[0].data.length).toBe(data.length)
    })

    test('structureBarData formatted for chart.js', ()  => {
        expect(Object.keys(dataset[0]).sort()).toEqual(
            ['type', 'data', 'label', 'backgroundColor'].sort()
        )
    })

    test('structureBarData is type bar', () => {
        expect(dataset[0].type).toBe('bar')
    })

    test('structureBarData is a single dataset with the label asdf', () => {
        expect(dataset[0].label).toBe('asdf')
    })

})


describe('defineBarPlugin test suite', () => {

    let plugins = defineBarPlugins(configure(config))

    test('custom tooltip function', () => {
        expect(plugins.tooltip.callbacks.label).toEqual(expect.any(Function))
    })

    test('annotation lines drawn at correct threshholds', () => {
        expect(plugins.annotation.annotations.map(x => x.yMin)).toEqual([7, -7, 5, -5])
    })

    test('annotation labels left for negative and right for positive', () => {
        expect(plugins.annotation.annotations.map(x => x.label.position)).toEqual(['end', 'start', 'end', 'start'])
    })

})

describe('getBarScales test suite', () => {
    test('x labels not visible for bar graph', () => {
        expect(getBarScales(configure(config)).x.ticks.display).toBeFalsy()
    })
})

// TODO
describe('scriptableOptions test suite', () => {
    
})