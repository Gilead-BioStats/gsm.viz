import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import About from './pages/About';
import Plots from './pages/Plots';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import React, { useState } from 'react';
import './index.css';

export default function App() {
    const [plot, setPlot] = useState('BarChart');

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
