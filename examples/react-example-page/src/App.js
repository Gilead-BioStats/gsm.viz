import React from 'react';
import NavBar from './pages/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Switch from 'react-switch';
import Home from './pages/Home';
import Blog from './pages/Blogs';
import Contact from './pages/Contact';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />

                <div className="pages">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/blog" component={Blog} />
                        <Route path="/contact" component={Contact} />
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    );
}

// ReactDOM.render(<App />, document.getElementById('app'));
