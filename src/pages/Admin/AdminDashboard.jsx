import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FaProjectDiagram, FaUsers, FaBlog, FaArrowRight, FaDatabase, FaCheckCircle, FaExclamationCircle, FaSpinner, FaCloudUploadAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import Static Data for Seeding
import { portfolioItems } from '../../data/portfolioItems';
import { blogItems } from '../../data/blogItems';
import { staticTeamMembers } from '../team/Team';

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

    // Import statuses: 'idle', 'loading', 'success', 'error'
    const [importStatus, setImportStatus] = useState({
        projects: 'idle',
        team: 'idle',
        blogs: 'idle'
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

    const handleImportProjects = async () => {
        if (!window.confirm("Import static Portfolio Projects into the database?")) return;
        setImportStatus(prev => ({ ...prev, projects: 'loading' }));
        try {
            // Check for existing projects by title to avoid duplicates
            const { data: existing, error: fetchError } = await supabase
                .from('projects')
                .select('title');

            if (fetchError) throw fetchError;

            const existingTitles = new Set(existing?.map(p => p.title) || []);

            const projectsToInsert = portfolioItems
                .filter(item => !existingTitles.has(item.title))
                .map(({ id, ...item }) => ({
                    title: item.title,
                    subtitle: item.subtitle,
                    domain: item.domain,
                    location: item.location,
                    description: item.description,
                    image: item.image, // Note: Static import path
                    year: item.year,
                    size: item.size,
                    client: item.client,
                    collaboration: item.collaboration
                }));

            if (projectsToInsert.length === 0) {
                alert("All projects already exist in the database.");
                setImportStatus(prev => ({ ...prev, projects: 'success' }));
                setTimeout(() => setImportStatus(prev => ({ ...prev, projects: 'idle' })), 3000);
            } else {
                const { error } = await supabase.from('projects').insert(projectsToInsert);
                if (error) throw error;

                alert(`Successfully imported ${projectsToInsert.length} new projects.`);
                setImportStatus(prev => ({ ...prev, projects: 'success' }));
                fetchData();
                setTimeout(() => setImportStatus(prev => ({ ...prev, projects: 'idle' })), 3000);
            }
        } catch (error) {
            console.error("Project import error:", error);
            setImportStatus(prev => ({ ...prev, projects: 'error' }));

            if (error.message?.includes('infinite recursion')) {
                alert("Error: Infinite recursion in database policy. \n\nThis usually means a Row Level Security (RLS) policy is checking a table that checks itself. \n\nPlease go to Supabase Dashboard > Authentication > Policies and ensure your 'admins' or 'projects' policies don't create a loop.");
            } else {
                alert("Error importing projects: " + error.message);
            }

            setTimeout(() => setImportStatus(prev => ({ ...prev, projects: 'idle' })), 3000);
        }
    };

    const handleImportTeam = async () => {
        if (!window.confirm("Import static Team Members into the database?")) return;
        setImportStatus(prev => ({ ...prev, team: 'loading' }));
        try {
            // Check for existing members by name/slug to avoid duplicates
            const { data: existing, error: fetchError } = await supabase
                .from('team_members')
                .select('slug, name');

            if (fetchError) throw fetchError;

            const existingSlugs = new Set(existing?.map(m => m.slug) || []);
            const existingNames = new Set(existing?.map(m => m.name) || []);

            const teamToInsert = staticTeamMembers
                .filter(item => !existingSlugs.has(item.slug) && !existingNames.has(item.name))
                .map(({ id, ...item }) => ({
                    name: item.name,
                    role: item.role,
                    bio: item.bio,
                    avatar: item.avatar, // Note: Static import path
                    slug: item.slug,
                    socials: item.socials
                }));

            if (teamToInsert.length === 0) {
                alert("All team members already exist in the database.");
                setImportStatus(prev => ({ ...prev, team: 'success' }));
                setTimeout(() => setImportStatus(prev => ({ ...prev, team: 'idle' })), 3000);
            } else {
                const { error } = await supabase.from('team_members').insert(teamToInsert);
                if (error) throw error;

                alert(`Successfully imported ${teamToInsert.length} new team members.`);
                setImportStatus(prev => ({ ...prev, team: 'success' }));
                fetchData();
                setTimeout(() => setImportStatus(prev => ({ ...prev, team: 'idle' })), 3000);
            }
        } catch (error) {
            console.error("Team import error:", error);
            setImportStatus(prev => ({ ...prev, team: 'error' }));
            alert("Error importing team: " + error.message);
            setTimeout(() => setImportStatus(prev => ({ ...prev, team: 'idle' })), 3000);
        }
    };

    const handleImportBlogs = async () => {
        if (!window.confirm("Import static Blog Posts into the database?")) return;
        setImportStatus(prev => ({ ...prev, blogs: 'loading' }));
        try {
            // Check for existing blogs by title
            const { data: existing, error: fetchError } = await supabase
                .from('blogs')
                .select('title');

            if (fetchError) throw fetchError;

            const existingTitles = new Set(existing?.map(b => b.title) || []);

            const blogsToInsert = blogItems
                .filter(item => !existingTitles.has(item.title))
                .map(({ id, ...item }) => ({
                    title: item.title,
                    subtitle: item.subtitle,
                    domain: item.domain,
                    author: item.author,
                    description: item.description,
                    image: item.image, // Note: Static import path
                    date: item.date,
                    read_time: item.readTime
                }));

            if (blogsToInsert.length === 0) {
                alert("All blog posts already exist in the database.");
                setImportStatus(prev => ({ ...prev, blogs: 'success' }));
                setTimeout(() => setImportStatus(prev => ({ ...prev, blogs: 'idle' })), 3000);
            } else {
                const { error } = await supabase.from('blogs').insert(blogsToInsert);
                if (error) throw error;

                alert(`Successfully imported ${blogsToInsert.length} new blog posts.`);
                setImportStatus(prev => ({ ...prev, blogs: 'success' }));
                fetchData();
                setTimeout(() => setImportStatus(prev => ({ ...prev, blogs: 'idle' })), 3000);
            }
        } catch (error) {
            console.error("Blog import error:", error);
            setImportStatus(prev => ({ ...prev, blogs: 'error' }));
            alert("Error importing blogs: " + error.message);
            setTimeout(() => setImportStatus(prev => ({ ...prev, blogs: 'idle' })), 3000);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h1>
                    <p className="text-zinc-500">Welcome back to your content management system.</p>
                </div>
            </div>

            {isDbEmpty && !loading && (
                <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-amber-800">
                    <FaExclamationCircle className="mt-1 shrink-0" />
                    <div>
                        <p className="font-bold">Your database is currently empty.</p>
                        <p className="text-sm">Use the Data Management section below to import your existing static content.</p>
                    </div>
                </div>
            )}

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
                    <button className="p-4 bg-white border border-zinc-200 rounded-lg text-left hover:border-black transition-colors" onClick={() => {
                        const el = document.getElementById('data-management');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <span className="block font-bold text-black mb-1"><FaDatabase className="inline mr-1" /> Import Data</span>
                        <span className="text-xs text-zinc-500">Manage static imports</span>
                    </button>
                </div>
            </div>

            {/* Recent Content Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

            {/* Data Management Section */}
            <div id="data-management" className="mb-12">
                <h2 className="text-lg font-bold mb-4">Data Management</h2>
                <div className="bg-white border border-zinc-200 rounded-xl p-6">
                    <p className="text-zinc-600 mb-6">Import static content from your local files into the database. Use this to perform an initial migration or restore default content.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Projects Import Card */}
                        <div className="border border-zinc-100 rounded-lg p-4 bg-zinc-50 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                                    <FaProjectDiagram className="text-blue-600" /> Projects
                                </h3>
                                <p className="text-xs text-zinc-500 mb-4">Import {portfolioItems.length} portfolio items from static files.</p>
                            </div>
                            <button
                                onClick={handleImportProjects}
                                disabled={importStatus.projects === 'loading' || importStatus.projects === 'success'}
                                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${importStatus.projects === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                                    importStatus.projects === 'loading' ? 'bg-zinc-100 text-zinc-400 border border-zinc-200' :
                                        'bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400'
                                    }`}
                            >
                                {importStatus.projects === 'loading' ? <><FaSpinner className="animate-spin" /> Importing...</> :
                                    importStatus.projects === 'success' ? <><FaCheckCircle /> Imported</> :
                                        <><FaCloudUploadAlt /> Import Projects</>}
                            </button>
                        </div>

                        {/* Team Import Card */}
                        <div className="border border-zinc-100 rounded-lg p-4 bg-zinc-50 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                                    <FaUsers className="text-purple-600" /> Team
                                </h3>
                                <p className="text-xs text-zinc-500 mb-4">Import {staticTeamMembers.length} team members from static files.</p>
                            </div>
                            <button
                                onClick={handleImportTeam}
                                disabled={importStatus.team === 'loading' || importStatus.team === 'success'}
                                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${importStatus.team === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                                    importStatus.team === 'loading' ? 'bg-zinc-100 text-zinc-400 border border-zinc-200' :
                                        'bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400'
                                    }`}
                            >
                                {importStatus.team === 'loading' ? <><FaSpinner className="animate-spin" /> Importing...</> :
                                    importStatus.team === 'success' ? <><FaCheckCircle /> Imported</> :
                                        <><FaCloudUploadAlt /> Import Team</>}
                            </button>
                        </div>

                        {/* Blogs Import Card */}
                        <div className="border border-zinc-100 rounded-lg p-4 bg-zinc-50 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                                    <FaBlog className="text-pink-600" /> Blogs
                                </h3>
                                <p className="text-xs text-zinc-500 mb-4">Import {blogItems.length} blog posts from static files.</p>
                            </div>
                            <button
                                onClick={handleImportBlogs}
                                disabled={importStatus.blogs === 'loading' || importStatus.blogs === 'success'}
                                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${importStatus.blogs === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                                    importStatus.blogs === 'loading' ? 'bg-zinc-100 text-zinc-400 border border-zinc-200' :
                                        'bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400'
                                    }`}
                            >
                                {importStatus.blogs === 'loading' ? <><FaSpinner className="animate-spin" /> Importing...</> :
                                    importStatus.blogs === 'success' ? <><FaCheckCircle /> Imported</> :
                                        <><FaCloudUploadAlt /> Import Blogs</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
