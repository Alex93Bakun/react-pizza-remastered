import React, { FC } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => (
    <div className="wrapper">
        <Header />
        <div className="content">
            <Outlet />
        </div>
    </div>
);

export default MainLayout;
