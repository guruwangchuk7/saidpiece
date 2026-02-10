import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaUserPlus, FaTrash, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminManager = () => {
    const { user } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkAccess();
        fetchAdmins();
    }, []);

    const checkAccess = async () => {
        // Double check if user is super_admin
        const { data } = await supabase.from('admins').select('role').eq('email', user.email).single();
        if (data?.role !== 'super_admin' && user.email !== 'guruwangchuk1234@gmail.com') {
            alert("Restricted Access");
            window.location.href = '/admin/dashboard';
        }
    };

    const fetchAdmins = async () => {
        const { data, error } = await supabase
            .from('admins')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching admins:', error);
        else setAdmins(data || []);
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('admins')
                .insert([{ email, role }]);

            if (error) throw error;

            alert('Admin added successfully!');
            setEmail('');
            fetchAdmins();
        } catch (error) {
            console.error('Error adding admin:', error);
            alert('Error adding admin: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this admin access?")) return;

        try {
            const { error } = await supabase.from('admins').delete().eq('id', id);
            if (error) throw error;
            fetchAdmins();
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-zinc-900 mb-8">Admin Access Management</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 mb-8">
                <h2 className="text-lg font-bold mb-4">Add New Administrator</h2>
                <form onSubmit={handleAddAdmin} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Google Email Address"
                        required
                        className="flex-1 px-4 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black"
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="px-4 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black"
                    >
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-zinc-800 disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Grant Access'}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50">
                    <h3 className="font-bold text-zinc-700">Authorized Personnel</h3>
                </div>
                <ul className="divide-y divide-zinc-100">
                    {admins.map((admin) => (
                        <li key={admin.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${admin.role === 'super_admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <FaUserShield />
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-900">{admin.email}</p>
                                    <p className="text-xs text-zinc-500 capitalize">{admin.role.replace('_', ' ')}</p>
                                </div>
                            </div>

                            {/* Prevent deleting yourself or if you are not super admin (though layout handles that) */}
                            {admin.email !== user.email && (
                                <button
                                    onClick={() => handleDelete(admin.id)}
                                    className="text-red-400 hover:text-red-600 p-2"
                                    title="Revoke Access"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </li>
                    ))}
                    {admins.length === 0 && <li className="px-6 py-4 text-zinc-500 text-center">No admins found.</li>}
                </ul>
            </div>
        </div>
    );
};

export default AdminManager;
