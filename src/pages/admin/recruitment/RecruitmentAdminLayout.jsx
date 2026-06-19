import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const RecruitmentAdminLayout = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-zinc-900">Recruitment Dashboard</h1>
                <div className="flex gap-2 bg-white rounded-lg p-1 border border-zinc-200">
                    <NavLink
                        to="/admin/recruitment/applications"
                        className={({ isActive }) => `
                            px-4 py-2 text-sm font-medium rounded-md transition-colors
                            ${isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}
                        `}
                    >
                        Applications
                    </NavLink>
                    <NavLink
                        to="/admin/recruitment/analytics"
                        className={({ isActive }) => `
                            px-4 py-2 text-sm font-medium rounded-md transition-colors
                            ${isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}
                        `}
                    >
                        Analytics
                    </NavLink>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default RecruitmentAdminLayout;
