import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

const App: FC = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
        </Route>
    </Routes>
);

export default App;
