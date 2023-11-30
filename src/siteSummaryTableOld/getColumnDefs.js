export default function getColumnDefs(data) {
    //Assign KRI elements into their values
    const kriObj = data.all_kris_list.map((kri) => (
        {
            header: kri.kri_acronym,
            accessorKey: kri.kri_id,
            //cell: (props) => <span>{flagStatusIcon(props.getValue())}</span>
        }
    ))
    .sort((a,b) => 
        a.accessorKey < b.accessorKey ? -1 : 
        b.accessorKey < a.accessorKey ? 1 : 0 
    );
    
    //Structure for our headers/colums keys
    const columns = [
        {
            header: "Site ID",
            accessorKey: "site_id"
        },
        {
            header: "Enrolled subjects",
            accessorKey: "enrolled_subjects"
        },
        {
            header: "Red kris",
            accessorKey: "red_kris",
            //cell: (props) => <span>{flagStatusIcon(props.getValue())}</span>
        },
        {
            header: "Amber kris",
            accessorKey: "amber_kris",
            //cell: (props) => <span>{flagStatusIcon(props.getValue())}</span>
        },
        ...kriObj
    ];

    return(columns)
}
