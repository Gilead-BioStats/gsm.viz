import { useState, useMemo } from 'react';
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel } from '@tanstack/react-table';
import { CheckOutlined, MinusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
//import { siteSummaryTable } from 'rbm-viz';
import doubleDownArrow from './assets/doubleDownArrow.svg';
import singleArrow from './assets/singleArrow.svg';
import ascend from './assets/sort-up-solid.svg';
import sortIcon from './assets/sort-solid.svg';
import descend from './assets/sort-down-solid.svg';
import makeSiteSummaryData from './components/SummaryData/summaryTable';
import SUMMARY_DATA from './services/siteSummaryData.json';
import './App.css';

function App() {
  
    const flagStatusIcon = (data, obj) => {
      // console.log("obj: ", obj);
      switch (data) {
        case 2:
          return (
            <Tooltip placement='bottom' title={obj ? 
              <div className='align'>
                {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
                {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
                {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
              </div> : ''}>
              <img className='help' alt="" src={doubleDownArrow} />
            </Tooltip>
          )
          break;
        case 1:
          return (
            <Tooltip placement='bottom' title={obj ? 
              <div className='align'>
                {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
                {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
                {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
              </div> : ''}>
              <img className='help' alt="" src={singleArrow} />
            </Tooltip>
          )
          break;
        case 0:
          return (
            <Tooltip placement='bottom' title={obj ? 
              <div className='align'>
                {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
                {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
                {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
              </div> : ''}>
              <CheckOutlined style={{ color: '#3aaf00' }} className='help' />
            </Tooltip>
          )
          break;
        case -1:
          return (
            <Tooltip placement='bottom' title={obj ? 
              <div className='align'>
                {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
                {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
                {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
              </div> : ''}>
              <img alt="" src={singleArrow} className="help flag-icon-rotate" />
            </Tooltip>
          )
          break;
        case -2:
          return (
            <Tooltip placement='bottom' title={obj ? 
              <div className='align'>
                {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
                {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
                {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
              </div> : ''}>
              <img alt="" src={doubleDownArrow} className="help flag-icon-rotate" />
            </Tooltip>
          )
          break;
        default:
          return (
            <Tooltip placement='bottom' title={obj ? 
              <div className='align'>
                {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
                {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
                {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
              </div> : ''}>
              <MinusOutlined className='help' />
            </Tooltip>
          )
          break;
      };
    }

  //Assign KRI elements into their values
  const kriObj = SUMMARY_DATA.all_kris_list.map((kri) => (
    {
      header: kri.kri_acronym,
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
  
  //Structure for our headers/colums keys
  const columns = [
    {
      header: "Site ID",
      accessorKey: "site_data",
      cell: (props) => (
        <Tooltip placement='right' color='#fff' title={
          <div className='align darkTxt'>
            {props.getValue().site_id ? <p><b>Site ID:</b> {props.getValue().site_id}</p> : ''}
            <hr/>
            {props.getValue().site_name ? <p>Site name: <b>{props.getValue().site_name}</b></p> : ''}
            {props.getValue().city ? <p>City: <b>{props.getValue().city}</b></p> : ''}
            {props.getValue().state ? <p>State: <b>{props.getValue().state}</b></p> : ''}
            {props.getValue().country ? <p>Country: <b>{props.getValue().country}</b></p> : ''}
            {props.getValue().site_status ? <p>Status: <b>{props.getValue().site_status}</b></p> : ''}
            {props.getValue().site_investigator ? <p>Site investigator: <b>{props.getValue().site_investigator}</b></p> : ''}
          </div>
        }>
          <span className='help'>{props.getValue().site_id}</span> <InfoCircleOutlined style={{ color: '#3c587f', cursor: 'help', fontSize: '12px', marginLeft: '2px' }} />
        </Tooltip>
      )
    },
    {
      header: "Enrolled subjects",
      accessorKey: "enrolled_subjects",
    },
    {
      header: "Red kris",
      accessorKey: "red_kris",
    },
    {
      header: "Amber kris",
      accessorKey: "amber_kris",
    },
    ...kriObj
  ];

  const [sorting, setSorting] = useState([]);

  //Structure for our TanStack table
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
