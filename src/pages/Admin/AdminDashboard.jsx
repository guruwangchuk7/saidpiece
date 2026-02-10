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
    const [recentData, setRecentData] = useState({
        projects: [],
        team: [],
        blogs: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Counts
                const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
                const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
                const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });

                setStats({
                    projects: projectCount || 0,
                    team: teamCount || 0,
                    blogs: blogCount || 0
                });

                // Fetch Recent Items (Limit 5)
                const { data: recentProjects } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(5);
                const { data: recentTeam } = await supabase.from('team_members').select('*').order('created_at', { ascending: false }).limit(5);
                const { data: recentBlogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(5);

                setRecentData({
                    projects: recentProjects || [],
                    team: recentTeam || [],
                    blogs: recentBlogs || []
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h1>
                <p className="text-zinc-500">Welcome back to your content management system.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

            {/* Quick Actions */}
            <div className="mb-12">
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
                    <button className="p-4 bg-white border border-zinc-200 rounded-lg text-left hover:border-black transition-colors" onClick={() => window.location.href = '/admin/team'}>
                        <span className="block font-bold text-black mb-1">+ Add Team Member</span>
                        <span className="text-xs text-zinc-500">Grow your team</span>
                    </button>
                </div>
            </div>

            {/* Recent Content Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
                        <h3 className="font-bold text-zinc-700">Recent Projects</h3>
                        <a href="/admin/projects" className="text-xs text-blue-600 hover:underline">View All</a>
                    </div>
                    <ul className="divide-y divide-zinc-100">
                        {recentData.projects.map(p => (
                            <li key={p.id} className="px-6 py-4 hover:bg-zinc-50 flex items-center gap-3">
                                <div className="w-10 h-10 bg-zinc-200 rounded overflow-hidden shrink-0">
                                    {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-zinc-900">{p.title}</p>
                                    <p className="text-xs text-zinc-500 truncate">{p.domain}</p>
                                </div>
                            </li>
                        ))}
                        {recentData.projects.length === 0 && <li className="px-6 py-8 text-center text-zinc-400 text-sm">No projects yet.</li>}
                    </ul>
                </div>

                {/* Recent Team */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
                        <h3 className="font-bold text-zinc-700">Recent Team</h3>
                        <a href="/admin/team" className="text-xs text-blue-600 hover:underline">View All</a>
                    </div>
                    <ul className="divide-y divide-zinc-100">
                        {recentData.team.map(m => (
                            <li key={m.id} className="px-6 py-4 hover:bg-zinc-50 flex items-center gap-3">
                                <div className="w-10 h-10 bg-zinc-200 rounded-full overflow-hidden shrink-0">
                                    {m.avatar ? <img src={m.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-zinc-300"></div>}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-zinc-900">{m.name}</p>
                                    <p className="text-xs text-zinc-500 truncate">{m.role}</p>
                                </div>
                            </li>
                        ))}
                        {recentData.team.length === 0 && <li className="px-6 py-8 text-center text-zinc-400 text-sm">No team members yet.</li>}
                    </ul>
                </div>

                {/* Recent Blogs */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
                        <h3 className="font-bold text-zinc-700">Recent Blogs</h3>
                        <a href="/admin/blog" className="text-xs text-blue-600 hover:underline">View All</a>
                    </div>
                    <ul className="divide-y divide-zinc-100">
                        {recentData.blogs.map(b => (
                            <li key={b.id} className="px-6 py-4 hover:bg-zinc-50 flex items-center gap-3">
                                <div className="w-10 h-10 bg-zinc-200 rounded overflow-hidden shrink-0">
                                    {b.image && <img src={b.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-zinc-900">{b.title}</p>
                                    <p className="text-xs text-zinc-500 truncate">{b.date}</p>
                                </div>
                            </li>
                        ))}
                        {recentData.blogs.length === 0 && <li className="px-6 py-8 text-center text-zinc-400 text-sm">No blogs yet.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
