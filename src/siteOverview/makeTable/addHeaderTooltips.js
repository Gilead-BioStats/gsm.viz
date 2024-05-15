export default function addHeaderTooltips(thead, workflows) {
    thead
        .selectAll('th')
        .filter((d) => /^kri/.test(d.key))
        .classed('tooltip', true)
        .attr('title', function (d) {
            const workflow = workflows.find(
                (workflow) => workflow.workflowid === d.key
            );

            return workflow.metric;
        });
}
