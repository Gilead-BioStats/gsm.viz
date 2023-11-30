import { flexRender } from '@tanstack/react-table';

export default function defineTbody(table) {
    return(
        table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
                {
                    row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={
                            cell.id.includes("amber_kris")
                                ? "background-yellow"
                                : cell.id.includes("red_kris")
                                ? "background_red"
                                : "cursor-info"
                        }>
                            { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                        </td>
                    ))
                }
            </tr>
        ))
    );
}
