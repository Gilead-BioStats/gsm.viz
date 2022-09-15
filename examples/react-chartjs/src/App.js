import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import faker from 'faker';

import rbmViz from 'rbm-viz';

import logo from './logo.svg';
import './App.css';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
console.log(rbmViz.scatterPlot);

export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

export const data = {
    datasets: [
        {
            label: 'A dataset',
            data: Array.from({ length: 100 }, () => ({
                x: faker.datatype.number({ min: -100, max: 100 }),
                y: faker.datatype.number({ min: -100, max: 100 }),
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};

export function App() {
    return <Scatter options={options} data={data} />;
}

//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;
