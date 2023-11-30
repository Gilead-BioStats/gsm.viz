import SUMMARY_DATA from './summary-data.json';
import './siteSummaryTable/App.css';

import defineKriObj from './siteSummaryTable/defineKriObj.js';
import defineColumns from './siteSummaryTable/app/defineColumns.js';
import DefineTable from './siteSummaryTable/app/defineTable.js';
import defineThead from './siteSummaryTable/app/defineThead.js';
import defineTbody from './siteSummaryTable/app/defineTbody.js';

function SummaryTableApp() {
  //Assign KRI elements into their values
  const kriObj = defineKriObj(SUMMARY_DATA);
  
  //Structure for our headers/colums keys
  const columns = defineColumns(kriObj);

  //Structure for our TanStack table
  const table = DefineTable(SUMMARY_DATA, columns);

  return (
    <div className="App">
      <h3>Site Summary Table</h3>
      <div className='table-container'>
        <table className='table'>
          <thead>
            { defineThead(table) }
          </thead>
          <tbody>
            { defineTbody(table) }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SummaryTableApp;
