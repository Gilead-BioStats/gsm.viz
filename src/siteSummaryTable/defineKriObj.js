import headerTooltip from './headerTooltip.js';
import flagStatusIcon from './flagStatusIcon.js';

export default function defineKriObj(data) {
  //Assign KRI elements into their values
  const kriObj = data.all_kris_list.map((kri) => (
    {
      header: headerTooltip(kri),
      accessorKey: kri.kri_id,
      cell: (props) => <span>{flagStatusIcon(props.getValue().flag_value, props.getValue())}</span>,
      sortingFn: (A, B, columnId) => {
        const flag_comparison = Math.abs(A.original[columnId].flag_value) - Math.abs(B.original[columnId].flag_value);
        const score_comparison = Math.abs(A.original[columnId].selected_snapshot_kri_value) - Math.abs(B.original[columnId].selected_snapshot_kri_value);
        return flag_comparison || score_comparison;
      }
    }
  ))
  .sort((a,b) => 
    a.accessorKey < b.accessorKey ? -1 : 
    b.accessorKey < a.accessorKey ? 1 : 0 
  );

  return(kriObj);
}
