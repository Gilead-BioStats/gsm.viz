import SUMMARY_DATA from './services/siteSummaryData.json';
import './App.css';

import defineKriObj from './app/defineKriObj.js';
import defineColumns from './app/defineColumns.js';
import DefineTable from './app/DefineTable.js';
import defineThead from './app/defineThead.js';
import defineTbody from './app/defineTbody.js';

function App() {
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

export default App;
