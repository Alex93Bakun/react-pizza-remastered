import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

const MainLayout: FC = () => (
    <div className="wrapper">
        <Header />
        <div className="content">
            <Outlet />
        </div>
    </div>
);

export default MainLayout;
