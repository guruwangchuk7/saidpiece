import React, { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabaseClient';
import toast from 'react-hot-toast';

const AnalyticsAdmin = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('career_applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApplications(data || []);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            toast.error('Failed to load analytics data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-zinc-500">Loading analytics...</div>;
    }

    // Calculations
    const total = applications.length;
    const today = new Date().toDateString();
    const appsToday = applications.filter(a => new Date(a.created_at).toDateString() === today).length;
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const appsThisWeek = applications.filter(a => new Date(a.created_at) >= oneWeekAgo).length;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const appsThisMonth = applications.filter(a => new Date(a.created_at) >= oneMonthAgo).length;

    // Helper for aggregations
    const aggregate = (field) => {
        const counts = {};
        applications.forEach(app => {
            const val = app[field] || 'Unknown';
            counts[val] = (counts[val] || 0) + 1;
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    };

    const degrees = aggregate('degree_program');
    const positions = aggregate('position_interest');

    // UI Helpers
    const StatCard = ({ title, value }) => (
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-center">
            <span className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-2">{title}</span>
            <span className="text-4xl font-bold text-zinc-900">{value}</span>
        </div>
    );

    const SimpleBarChart = ({ data, title }) => {
        const max = Math.max(...data.map(d => d[1]), 1);
        return (
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h3 className="text-zinc-900 font-bold mb-6 uppercase tracking-wider text-sm">{title}</h3>
                <div className="space-y-4">
                    {data.slice(0, 5).map(([label, count]) => (
                        <div key={label}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-zinc-700 truncate max-w-[80%]">{label}</span>
                                <span className="text-zinc-500">{count}</span>
                            </div>
                            <div className="w-full bg-zinc-100 rounded-full h-2">
                                <div 
                                    className="bg-zinc-900 h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${(count / max) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full overflow-y-auto pr-2 pb-10 space-y-6">
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Applications" value={total} />
                <StatCard title="Today" value={appsToday} />
                <StatCard title="This Week" value={appsThisWeek} />
                <StatCard title="This Month" value={appsThisMonth} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SimpleBarChart data={positions} title="Applications by Position" />
                <SimpleBarChart data={degrees} title="Applications by Degree" />
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-100 bg-zinc-50">
                    <h3 className="text-zinc-900 font-bold uppercase tracking-wider text-sm">Recent Applicants</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-100">
                                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Degree</th>
                                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Applied</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {applications.slice(0, 5).map(app => (
                                <tr key={app.id} className="hover:bg-zinc-50">
                                    <td className="px-6 py-3 text-sm font-medium text-zinc-900">{app.full_name}</td>
                                    <td className="px-6 py-3 text-sm text-zinc-600">{app.position_interest}</td>
                                    <td className="px-6 py-3 text-sm text-zinc-600">{app.degree_program}</td>
                                    <td className="px-6 py-3 text-sm text-zinc-500 text-right">{new Date(app.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-zinc-500">No applicants yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AnalyticsAdmin;
