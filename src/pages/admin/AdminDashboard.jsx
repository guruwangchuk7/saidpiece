import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaProjectDiagram, FaUsers, FaBlog, FaArrowRight, FaDatabase, FaCheckCircle, FaExclamationCircle, FaSpinner, FaCloudUploadAlt, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { importProjects, importTeam, importBlogs } from '../../utils/seedDatabase';
import ConfirmModal from '../../components/common/ConfirmModal';
import { toast } from 'react-hot-toast';

const StatCard = ({ title, count, icon, color, link }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(link)}
            className="bg-white rounded-lg p-8 border border-zinc-100 hover:border-zinc-900 transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-lg ${color} text-white`}>
                    {icon}
                </div>
                <div className="text-zinc-300 group-hover:text-zinc-900 transition-colors">
                    <FaArrowRight />
                </div>
            </div>
            <h3 className="text-4xl font-bold text-zinc-900 mb-2 tracking-tight">{count}</h3>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{title}</p>
        </div>
    );
};

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        team: 0,
        blogs: 0,
        messages: 0
    });
    const [recentData, setRecentData] = useState({
        projects: [],
        team: [],
        blogs: [],
        messages: []
    });
    const [loading, setLoading] = useState(true);

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        isLoading: false,
        isDangerous: false
    });

    // Check if DB is effectively empty
    const isDbEmpty = stats.projects === 0 && stats.team === 0 && stats.blogs === 0;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Counts
            const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
            const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
            const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
            const { count: messageCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });

            setStats({
                projects: projectCount || 0,
                team: teamCount || 0,
                blogs: blogCount || 0,
                messages: messageCount || 0
            });

            // Fetch Recent Items (Limit 5)
            const { data: recentProjects } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(5);
            const { data: recentTeam } = await supabase.from('team_members').select('*').order('created_at', { ascending: false }).limit(5);
            const { data: recentBlogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(5);
            const { data: recentMessages } = await supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5);

            setRecentData({
                projects: recentProjects || [],
                team: recentTeam || [],
                blogs: recentBlogs || [],
                messages: recentMessages || []
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Generic handler to show confirm modal and execute async action
     */
    const handleImportAction = (type) => {
        let title = '';
        let message = '';
        let importFn = null;

        switch (type) {
            case 'projects':
                title = 'Import Portfolio Projects';
                message = 'Are you sure you want to import static project data into the database? This might create duplicates if run multiple times, although checks are in place. Images will be uploaded to storage.';
                importFn = importProjects;
                break;
            case 'team':
                title = 'Import Team Members';
                message = 'Are you sure you want to import static team data into the database? This will seed the team table with initial members.';
                importFn = importTeam;
                break;
            case 'blogs':
                title = 'Import Blog Posts';
                message = 'Are you sure you want to import static blog posts into the database? This will populate the blog section.';
                importFn = importBlogs;
                break;
            default:
                return;
        }

        setModalConfig({
            isOpen: true,
            title,
            message,
            onConfirm: async () => {
                setModalConfig(prev => ({ ...prev, isLoading: true }));

                // Use toast.promise for nice UI feedback
                toast.promise(
                    importFn(),
                    {
                        loading: `Importing ${type}...`,
                        success: (data) => {
                            if (data.count > 0) fetchData();
                            setModalConfig(prev => ({ ...prev, isOpen: false, isLoading: false }));
                            return data.message;
                        },
                        error: (err) => {
                            setModalConfig(prev => ({ ...prev, isOpen: false, isLoading: false }));
                            return `Import failed: ${err.message}`;
                        }
                    }
                );
            },
            isLoading: false,
            isDangerous: false
        });
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-20 relative">
            <ConfirmModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                isLoading={modalConfig.isLoading}
                isDangerous={modalConfig.isDangerous}
                confirmText="Import Data"
            />

            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight uppercase mb-3">
                    Dashboard
                </h1>
                <p className="text-zinc-600 text-sm lg:text-base">Manage your content and site data.</p>
            </div>

            {isDbEmpty && !loading && (
                <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-amber-600">
                    <FaExclamationCircle className="mt-1 shrink-0" />
                    <div>
                        <p className="font-semibold text-sm">Your database is currently empty.</p>
                        <p className="text-xs mt-1">Use the Data Management section below to import your existing static content.</p>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <StatCard
                    title="Projects"
                    count={stats.projects}
                    icon={<FaProjectDiagram size={20} />}
                    color="bg-zinc-900"
                    link="/admin/projects"
                />
                <StatCard
                    title="Team Members"
                    count={stats.team}
                    icon={<FaUsers size={20} />}
                    color="bg-zinc-900"
                    link="/admin/team"
                />
                <StatCard
                    title="Blog Posts"
                    count={stats.blogs}
                    icon={<FaBlog size={20} />}
                    color="bg-zinc-900"
                    link="/admin/blog"
                />
                <StatCard
                    title="Messages"
                    count={stats.messages}
                    icon={<FaEnvelope size={20} />}
                    color="bg-zinc-900"
                    link="/admin/messages"
                />
            </div>

            {/* Quick Actions */}
            <div className="mb-16">
                <h2 className="text-lg font-bold mb-6 uppercase tracking-wider text-zinc-900">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-5 bg-white border border-zinc-200 rounded-lg text-left hover:border-zinc-900 transition-all group" onClick={() => window.location.href = '/admin/blog'}>
                        <span className="block font-bold text-zinc-900 mb-2 text-sm uppercase tracking-wide">+ New Blog Post</span>
                        <span className="text-xs text-zinc-500">Write an article</span>
                    </button>
                    <button className="p-5 bg-white border border-zinc-200 rounded-lg text-left hover:border-zinc-900 transition-all group" onClick={() => window.location.href = '/admin/projects'}>
                        <span className="block font-bold text-zinc-900 mb-2 text-sm uppercase tracking-wide">+ Add Project</span>
                        <span className="text-xs text-zinc-500">Showcase work</span>
                    </button>
                    <button className="p-5 bg-white border border-zinc-200 rounded-lg text-left hover:border-zinc-900 transition-all group" onClick={() => window.location.href = '/admin/team'}>
                        <span className="block font-bold text-zinc-900 mb-2 text-sm uppercase tracking-wide">+ Add Team Member</span>
                        <span className="text-xs text-zinc-500">Grow your team</span>
                    </button>
                    <button className="p-5 bg-white border border-zinc-200 rounded-lg text-left hover:border-zinc-900 transition-all group" onClick={() => {
                        const el = document.getElementById('data-management');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <span className="block font-bold text-zinc-900 mb-2 text-sm uppercase tracking-wide"><FaDatabase className="inline mr-1" /> Import Data</span>
                        <span className="text-xs text-zinc-500">Manage static imports</span>
                    </button>
                </div>
            </div>

            {/* Recent Content Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {/* Recent Projects */}
                <div className="bg-white rounded-lg border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50">
                        <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Recent Projects</h3>
                    </div>
                    <ul className="divide-y divide-zinc-100">
                        {recentData.projects.map(p => (
                            <li key={p.id} className="px-6 py-4 hover:bg-zinc-50 flex items-center gap-3 transition-colors">
                                <div className="w-10 h-10 bg-zinc-200 rounded overflow-hidden shrink-0">
                                    {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-zinc-900">{p.title}</p>
                                    <p className="text-xs text-zinc-500 truncate uppercase tracking-wide">{p.domain}</p>
                                </div>
                            </li>
                        ))}
                        {recentData.projects.length === 0 && <li className="px-6 py-8 text-center text-zinc-400 text-xs uppercase tracking-wider">No projects yet.</li>}
                    </ul>
                </div>

                {/* Recent Team */}
                <div className="bg-white rounded-lg border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50">
                        <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Recent Team</h3>
                    </div>
                    <ul className="divide-y divide-zinc-100">
                        {recentData.team.map(m => (
                            <li key={m.id} className="px-6 py-4 hover:bg-zinc-50 flex items-center gap-3 transition-colors">
                                <div className="w-10 h-10 bg-zinc-200 rounded-full overflow-hidden shrink-0">
                                    {m.avatar ? <img src={m.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-zinc-300"></div>}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-zinc-900">{m.name}</p>
                                    <p className="text-xs text-zinc-500 truncate uppercase tracking-wide">{m.role}</p>
                                </div>
                            </li>
                        ))}
                        {recentData.team.length === 0 && <li className="px-6 py-8 text-center text-zinc-400 text-xs uppercase tracking-wider">No team members yet.</li>}
                    </ul>
                </div>

                {/* Recent Blogs */}
                <div className="bg-white rounded-lg border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50">
                        <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Recent Blogs</h3>
                    </div>
                    <ul className="divide-y divide-zinc-100">
                        {recentData.blogs.map(b => (
                            <li key={b.id} className="px-6 py-4 hover:bg-zinc-50 flex items-center gap-3 transition-colors">
                                <div className="w-10 h-10 bg-zinc-200 rounded overflow-hidden shrink-0">
                                    {b.image && <img src={b.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-zinc-900">{b.title}</p>
                                    <p className="text-xs text-zinc-500 truncate">{b.date}</p>
                                </div>
                            </li>
                        ))}
                        {recentData.blogs.length === 0 && <li className="px-6 py-8 text-center text-zinc-400 text-xs uppercase tracking-wider">No blogs yet.</li>}
                    </ul>
                </div>

                {/* Recent Messages */}
                <div className="bg-white rounded-lg border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50">
                        <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Recent Messages</h3>
                    </div>
                    <ul className="divide-y divide-zinc-100">
                        {recentData.messages.map(m => (
                            <li key={m.id} className="px-6 py-4 hover:bg-zinc-50 flex items-center gap-3 transition-colors cursor-pointer" onClick={() => window.location.href = '/admin/messages'}>
                                <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500 font-bold text-xs shrink-0">
                                    {m.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-zinc-900">{m.name}</p>
                                    <p className="text-xs text-zinc-500 truncate">{m.message}</p>
                                </div>
                            </li>
                        ))}
                        {recentData.messages.length === 0 && <li className="px-6 py-8 text-center text-zinc-400 text-xs uppercase tracking-wider">No messages yet.</li>}
                    </ul>
                </div>
            </div>

            {/* Data Management Section */}
            <div id="data-management" className="mb-12">
                <h2 className="text-lg font-bold mb-6 uppercase tracking-wider text-zinc-900">Data Management</h2>
                <div className="bg-white border border-zinc-200 rounded-lg p-8">
                    <p className="text-zinc-600 mb-8 text-sm">Import static content from your local files into the database. Use this to perform an initial migration or restore default content.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Projects Import Card */}
                        <div className="border border-zinc-100 rounded-lg p-6 bg-zinc-50 flex flex-col justify-between hover:border-zinc-900 transition-all">
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2 uppercase tracking-wide text-sm">
                                    <FaProjectDiagram className="text-zinc-900" /> Projects
                                </h3>
                                {/* Assuming portfolioItems is imported */}
                                <p className="text-xs text-zinc-500 mb-6">Import static portfolio items.</p>
                            </div>
                            <button
                                onClick={() => handleImportAction('projects')}
                                className="w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800"
                            >
                                <FaCloudUploadAlt /> Import Projects
                            </button>
                        </div>

                        {/* Team Import Card */}
                        <div className="border border-zinc-100 rounded-lg p-6 bg-zinc-50 flex flex-col justify-between hover:border-zinc-900 transition-all">
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2 uppercase tracking-wide text-sm">
                                    <FaUsers className="text-zinc-900" /> Team
                                </h3>
                                <p className="text-xs text-zinc-500 mb-6">Import static team members.</p>
                            </div>
                            <button
                                onClick={() => handleImportAction('team')}
                                className="w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800"
                            >
                                <FaCloudUploadAlt /> Import Team
                            </button>
                        </div>

                        {/* Blogs Import Card */}
                        <div className="border border-zinc-100 rounded-lg p-6 bg-zinc-50 flex flex-col justify-between hover:border-zinc-900 transition-all">
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2 uppercase tracking-wide text-sm">
                                    <FaBlog className="text-zinc-900" /> Blogs
                                </h3>
                                <p className="text-xs text-zinc-500 mb-6">Import static blog posts.</p>
                            </div>
                            <button
                                onClick={() => handleImportAction('blogs')}
                                className="w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800"
                            >
                                <FaCloudUploadAlt /> Import Blogs
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
