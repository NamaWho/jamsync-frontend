import React from 'react';
import Sidebar from './Sidebar';
import Dashboardview from './Dashboardview';
import { Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';

const Admin = () => {
    return (
        <div className="flex overflow-scroll ">
            <div className="basis-[12%] h-[100vh]">
            <Sidebar />
            </div>
            <div className="basis-[88%] border overflow-scroll h-[100vh]">
            <Dashboardview />
            <div>
                <Dashboard />
            </div>
            </div>
        </div>
    );
}

export default Admin;