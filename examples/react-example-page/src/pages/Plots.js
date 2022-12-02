import BarChart from "../Components/BarChart"

import workflows from "../data/meta_workflow"
import parametersAll from '../data/meta_param';

const Plots = () => {

  const workflow = workflows[0];

  const workflowScoreBars = { ...workflow };
  const parameters = parametersAll.filter(
    (d) => d.workflowid === workflow.workflowid
  );

    return (
      <div>
        <BarChart
                config={workflowScoreBars}
                thresholds={parameters}
            />
      </div>
    );
};

export default Plots;