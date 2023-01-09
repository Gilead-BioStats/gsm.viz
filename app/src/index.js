import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import About from './pages/About';
import Plots from './pages/Plots';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import React, { useState } from 'react';
import './index.css';
import fetchData from './data/fetchData';

export default function App() {
    const [plot, setPlot] = useState('BarChart');

    // TODO: fetch data rather than bundling in app
    const dataURLs = [
        'https://raw.githubusercontent.com/Gilead-BioStats/rbm-viz/main/examples/data/results_summary.json?token=GHSAT0AAAAAAB3CTZ36ZKQQL7J3UN3CCVXUY54P2ZQ',
        'https://raw.githubusercontent.com/Gilead-BioStats/rbm-viz/main/examples/data/meta_workflow.json?token=GHSAT0AAAAAAB3CTZ37H6PID6NHBMK2QWNIY54P6RQ',
        'https://raw.githubusercontent.com/Gilead-BioStats/rbm-viz/main/examples/data/meta_param.json?token=GHSAT0AAAAAAB3CTZ37YJIA3FSDSCNVGPECY54P6UA',
    ];

    //fetchData(dataURLs).then(data => {
    //    const [ resultsAll, workflows, parametersAll ] = data;
    //});

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout setPlot={setPlot} />}>
                    <Route index element={<About />} />
                    <Route path="plots" element={<Plots plot={plot} />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
