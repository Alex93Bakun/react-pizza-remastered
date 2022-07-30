import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const App: FC = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route
                path="*"
                element={
                    <Suspense fallback={<div>Идёт загрузка...</div>}>
                        <NotFound />
                    </Suspense>
                }
            />

            <Route path="/" element={<Home />} />
            <Route
                path="/cart"
                element={
                    <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                        <Cart />
                    </Suspense>
                }
            />
            <Route
                path="/pizza/:id"
                element={
                    <Suspense fallback={<div>Идёт загрузка...</div>}>
                        <FullPizza />
                    </Suspense>
                }
            />
        </Route>
    </Routes>
);

export default App;
