import React, { createContext, useState } from 'react';
import Header from './components/Header';

import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const SearchContext = createContext();

const App = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="*" element={<NotFound />} />

                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
};

export default App;
