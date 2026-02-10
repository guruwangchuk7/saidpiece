import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FaProjectDiagram, FaUsers, FaBlog, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, count, icon, color, link }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(link)}
            className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${color} text-white`}>
                    {icon}
                </div>
                <div className="text-zinc-400 group-hover:text-black transition-colors">
                    <FaArrowRight />
                </div>
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 mb-1">{count}</h3>
            <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{title}</p>
        </div>
    );
};

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        team: 0,
        blogs: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
                const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
                const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });

                setStats({
                    projects: projectCount || 0,
                    team: teamCount || 0,
                    blogs: blogCount || 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-8">Loading stats...</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h1>
                <p className="text-zinc-500">Welcome back to your content management system.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Active Projects"
                    count={stats.projects}
                    icon={<FaProjectDiagram size={20} />}
                    color="bg-blue-600"
                    link="/admin/projects"
                />
                <StatCard
                    title="Team Members"
                    count={stats.team}
                    icon={<FaUsers size={20} />}
                    color="bg-purple-600"
                    link="/admin/team"
                />
                <StatCard
                    title="Blog Posts"
                    count={stats.blogs}
                    icon={<FaBlog size={20} />}
                    color="bg-pink-600"
                    link="/admin/blog"
                />
            </div>

            {/* Recent Activity or Quick Actions could go here */}
            <div className="mt-12">
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-white border border-zinc-200 rounded-lg text-left hover:border-black transition-colors" onClick={() => window.location.href = '/admin/blog'}>
                        <span className="block font-bold text-black mb-1">+ New Blog Post</span>
                        <span className="text-xs text-zinc-500">Write an article</span>
                    </button>
                    <button className="p-4 bg-white border border-zinc-200 rounded-lg text-left hover:border-black transition-colors" onClick={() => window.location.href = '/admin/projects'}>
                        <span className="block font-bold text-black mb-1">+ Add Project</span>
                        <span className="text-xs text-zinc-500">Showcase work</span>
                    </button>
                    {/* Add more shortcuts */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
