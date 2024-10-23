import React, { lazy, Suspense } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

const Home = lazy(() => import('./pages/home/Home'))
const About = lazy(() => import('./pages/About/About'))


function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>} >
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
