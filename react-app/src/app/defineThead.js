import ascend from '../assets/sort-up-solid.svg';
import sortIcon from '../assets/sort-solid.svg';
import descend from '../assets/sort-down-solid.svg';

export default function defineThead(table) {
    return(
        table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {
                    headerGroup.headers.map(header => (
                        <th
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            className={header.id.includes("amber_kris") ? "background-yellow" : header.id.includes("red_kris") ? "background_red" : ""}
                        >
                            {header.column.columnDef.header}
                            {
                                header.column.getIsSorted() ? (
                                {
                                    asc: <img src={descend} className='sortIcon' />,
                                    desc: <img src={ascend} className='sortIcon' />,
                                }[header.column.getIsSorted()]
                                ) : (
                                    header.column.getCanSort() && (
                                        <img src={sortIcon} className='sortIcon' />
                                    )
                                )
                            }
                        </th>
                    ))
                }
            </tr>
        ))
    );
}
