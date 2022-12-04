import BarChart from "../Components/BarChart"

import workflows from "../data/meta_workflow"

const Plots = () => {

  const workflow = workflows[0];

  const workflowScoreBars = { ...workflow };

    return (
      <div>
        <BarChart
                config={workflowScoreBars}
            />
      </div>
    );
};

export default Plots;