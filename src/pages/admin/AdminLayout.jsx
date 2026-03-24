import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';
import { FaTachometerAlt, FaProjectDiagram, FaUsers, FaBlog, FaEnvelope, FaUserShield, FaSignOutAlt, FaBars, FaTimes, FaStore } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const AdminLayout = () => {
    const { user, signOut, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [adminRole, setAdminRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const checkAdminStatus = async () => {
            // EMERGENCY BYPASS for guruwangchuk1234@gmail.com
            if (user.email === 'guruwangchuk1234@gmail.com') {
                console.log("Emergency admin access granted for:", user.email);
                setAdminRole('super_admin');
                setLoading(false);
                return;
            }

            try {
                // Check if user is in admins table
                const { data, error } = await supabase
                    .from('admins')
                    .select('role')
                    .eq('email', user.email)
                    .single();

                if (error || !data) {
                    console.error('Admin check failed:', error || 'No data found');
                    toast.error(`Access Denied: ${user.email} is not an administrator.`);
                    signOut();
                    navigate('/');
                } else {
                    setAdminRole(data.role);
                }
            } catch (err) {
                console.error('Error checking admin status:', err);
                signOut();
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [user, navigate, signOut]);

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
        { path: '/admin/projects', label: 'Projects', icon: <FaProjectDiagram /> },
        { path: '/admin/store', label: 'Store', icon: <FaStore /> },
        { path: '/admin/team', label: 'Team', icon: <FaUsers /> },
        { path: '/admin/blog', label: 'Insights', icon: <FaBlog /> },
        { path: '/admin/messages', label: 'Messages', icon: <FaEnvelope /> },
        { path: '/admin/site-content', label: 'Site Settings', icon: <FaTachometerAlt /> },
    ];

    if (adminRole === 'super_admin') {
        navItems.push({ path: '/admin/users', label: 'Admins', icon: <FaUserShield /> });
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">Saidpiece Admin</h1>
                    <p className="text-gray-500 mb-8">Please sign in to access the dashboard.</p>
                    <button
                        onClick={signInWithGoogle}
                        className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 text-sm text-gray-500 hover:text-black transition-colors"
                    >
                        Return to Website
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`bg-zinc-900 text-white w-64 shrink-0 fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
            >
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                    <h1 className="text-xl font-bold uppercase tracking-wider">Saidpiece Admin</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-white">
                        <FaTimes />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-none">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                ${isActive
                                    ? 'bg-white text-black font-semibold shadow-md'
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}
                            `}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.email}</p>
                            <p className="text-xs text-zinc-500 capitalize">{adminRole?.replace('_', ' ')}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
                {/* Header */}
                <header className="bg-white shadow-sm z-40 px-6 py-4 flex justify-between items-center md:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-black">
                        <FaBars size={24} />
                    </button>
                    <span className="font-bold text-lg">Admin Panel</span>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 scrollbar-none">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
