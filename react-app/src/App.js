import './App.css';
import makeSiteSummaryData from './summaryTable';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import dataSum from './siteSummaryData.json';

function App() {

  //Assign KRI elements into their values
  const kriObj = dataSum.all_kris_list.map((kri) => (
    {
      header: kri.kri_acronym,
      accessorKey: kri.kri_id
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
      accessorKey: "red_kris"
    },
    {
      header: "Amber kris",
      accessorKey: "amber_kris"
    },
    ...kriObj
  ];

  //Structure for our TanStack table
  const table = useReactTable({
    data: makeSiteSummaryData(dataSum),
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="App">
      <h3>Site Summary Table</h3>
      <div className='table-container'>
        <table className='table'>
          <thead>
            {
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map((headers => (
                      <th key={headers.id}>
                        {flexRender(headers.column.columnDef.header, headers.getContext())}
                      </th>
                    )))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {
                    row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
