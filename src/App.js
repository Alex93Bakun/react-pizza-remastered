import React, { useState } from 'react';
import Header from './components/Header';

import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

const App = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="content">
                <Routes>
                    <Route path="*" element={<NotFound />} />

                    <Route path="/" element={<Home searchValue={searchValue} />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
