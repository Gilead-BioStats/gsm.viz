import defineBarPlugins from "../src/barChart/defineBarPlugins"
import getBarScales from "../src/barChart/getBarScales"
import scriptableOptions from "../src/barChart/scriptableOptions"
import structureBarData from "../src/barChart/structureBarData"
import updateBarConfig from "../src/barChart/updateBarConfig"
import updateBarOption from "../src/barChart/updateBarOption"
import updateBarPlugins from "../src/barChart/updateBarPlugins"
import configure from "../src/barChart/configure"

describe("barChart function suite", () => {

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
        selectedGroupID: [
            "160"
        ]
    }

    test('config transforms raw config to chart.js', ()  => {

        expect(Object.keys(configure(config))).toEqual([
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
        ])
    })

    test('structureBarData returns data object in chart.js format' , ()  => {
        
    })

    test('defineBarPlugins creates an object with custom tooltip', ()  => {
 
    })

    test('getBarScales returns scale object with no x ticks', ()  => {
        
    })

    // TODO
    test('scriptableOptions', ()  => {
        
    })

    // TODO
    test('updateBarConfig' , ()  => {
        
    })

    // TODO
    test('updateBarOption' , ()  => {
        
    })

    // TODO
    test('updateBarPlugins' , ()  => {
        
    })

})