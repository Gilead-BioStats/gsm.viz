import BarChartContainer from '../Components/BarChartContainer/BarChartContainer';
import ScatterPlotContainer from '../Components/ScatterPlotContainer/ScatterPlotContainer';
import { Switch, Case } from "../utils/Switch"

const Plots = ({plot}) => {

    return (
        <Switch test={plot}>
            <Case value="BarChart"><BarChartContainer/></Case>
            <Case value="ScatterPlot"><ScatterPlotContainer/></Case>
            <Case default>Plot not included yet!</Case>
        </Switch>
    );
};

export default Plots;
