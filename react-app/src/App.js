import { useState, useMemo } from 'react';
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel } from '@tanstack/react-table';

import ascend from './assets/sort-up-solid.svg';
import sortIcon from './assets/sort-solid.svg';
import descend from './assets/sort-down-solid.svg';

import makeSiteSummaryData from './components/SummaryData/summaryTable';
import SUMMARY_DATA from './services/siteSummaryData.json';
import './App.css';

import defineKriObj from './app/defineKriObj.js';
import defineColumns from './app/defineColumns.js';
//import defineTable from './app/defineTable.js';

function App() {
  //Assign KRI elements into their values
  const kriObj = defineKriObj(SUMMARY_DATA);
  
  //Structure for our headers/colums keys
  const columns = defineColumns(kriObj);

  // TODO: figure out how to import table from a dedicated funciton.
  // const table = defineTable(SUMMARYDATA, columns);
  //Structure for our TanStack table
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: useMemo(() => makeSiteSummaryData(SUMMARY_DATA), []),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
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
                    headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={header.id.includes("amber_kris") ? "background-yellow" : header.id.includes("red_kris") ? "background_red" : ""}
                      >
                        {header.column.columnDef.header}
                        {header.column.getIsSorted() ? (
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
            }
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {
                    row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={cell.id.includes("amber_kris") ? "background-yellow" : cell.id.includes("red_kris") ? "background_red" : "cursor-info"}>
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
