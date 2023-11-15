import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import doubleDownArrow from './assets/doubleDownArrow.svg';
import singleArrow from './assets/singleArrow.svg';
import makeSiteSummaryData from './components/SummaryData/summaryTable';
import SUMMARY_DATA from './services/siteSummaryData.json';
import './App.css';

function App() {

  const flagStatusIcon = (data) => {
    switch (data) {
      case 2:
        return <img alt="" src={doubleDownArrow} />
        break;
      case 1:
        return <img alt="" src={singleArrow} />
        break;
      case 0:
        return <CheckOutlined style={{ color: '#3aaf00' }} />
        break;
      case -1:
        return <img alt="" src={singleArrow} className="flag-icon-rotate" />
        break;
      case -2:
        return <img alt="" src={doubleDownArrow} className="flag-icon-rotate" />
        break;
      default:
        return <MinusOutlined />
        break;
    };
  }

  //Assign KRI elements into their values
  const kriObj = SUMMARY_DATA.all_kris_list.map((kri) => (
    {
      header: kri.kri_acronym,
      accessorKey: kri.kri_id,
      cell: (props) => <span>{flagStatusIcon(props.getValue())}</span>
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
      cell: (props) => <span>{flagStatusIcon(props.getValue())}</span>
    },
    {
      header: "Amber kris",
      accessorKey: "amber_kris",
      cell: (props) => <span>{flagStatusIcon(props.getValue())}</span>
    },
    ...kriObj
  ];

  //Structure for our TanStack table
  const table = useReactTable({
    data: makeSiteSummaryData(SUMMARY_DATA),
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
