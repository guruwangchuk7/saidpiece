import React, { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabaseClient';
import { FaSearch, FaFilter, FaDownload, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ApplicationsAdmin = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDegree, setFilterDegree] = useState('');
    const [filterPosition, setFilterPosition] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);
    const [deleteStage, setDeleteStage] = useState(0);

    useEffect(() => {
        if (selectedApp) setDeleteStage(0);
    }, [selectedApp]);

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
            console.error('Error fetching applications:', error);
            toast.error('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        if (applications.length === 0) return;
        
        const headers = ['Name', 'Email', 'Phone', 'Position', 'Degree', 'Status', 'Date Applied'];
        const csvContent = [
            headers.join(','),
            ...applications.map(app => [
                `"${app.full_name}"`,
                `"${app.email}"`,
                `"${app.contact_number}"`,
                `"${app.position_interest}"`,
                `"${app.degree_program}"`,
                `"${app.graduation_status}"`,
                `"${new Date(app.created_at).toLocaleDateString()}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'applications.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (id) => {
        if (deleteStage === 0) {
            setDeleteStage(1);
        } else if (deleteStage === 1) {
            setDeleteStage(2);
        } else if (deleteStage === 2) {
            try {
                const { error } = await supabase.from('career_applications').delete().eq('id', id);
                if (error) throw error;
                toast.success("Application deleted successfully.");
                setApplications(prev => prev.filter(a => a.id !== id));
                setSelectedApp(null);
                setDeleteStage(0);
            } catch (err) {
                console.error('Delete error:', err);
                toast.error("Failed to delete application.");
            }
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              app.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDegree = filterDegree ? app.degree_program === filterDegree : true;
        const matchesPosition = filterPosition ? app.position_interest === filterPosition : true;
        const matchesStatus = filterStatus ? app.graduation_status === filterStatus : true;
        
        return matchesSearch && matchesDegree && matchesPosition && matchesStatus;
    });

    const uniqueDegrees = [...new Set(applications.map(a => a.degree_program).filter(Boolean))];
    const uniquePositions = [...new Set(applications.map(a => a.position_interest).filter(Boolean))];
    const uniqueStatuses = [...new Set(applications.map(a => a.graduation_status).filter(Boolean))];

    return (
        <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-zinc-200">
            {/* Toolbar */}
            <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1 flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <div className="relative min-w-[200px]">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input 
                            type="text" 
                            placeholder="Search name or email..." 
                            className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <select 
                        className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none cursor-pointer"
                        value={filterDegree}
                        onChange={(e) => setFilterDegree(e.target.value)}
                    >
                        <option value="">All Degrees</option>
                        {uniqueDegrees.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <select 
                        className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none cursor-pointer"
                        value={filterPosition}
                        onChange={(e) => setFilterPosition(e.target.value)}
                    >
                        <option value="">All Positions</option>
                        {uniquePositions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>

                    <select 
                        className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none cursor-pointer"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <button 
                    onClick={downloadCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 whitespace-nowrap"
                >
                    <FaDownload /> Export CSV
                </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-200">Applicant</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-200">Position</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-200">Degree</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-200">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-200">Applied</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {loading ? (
                            <tr><td colSpan="5" className="text-center py-10 text-zinc-500">Loading applications...</td></tr>
                        ) : filteredApplications.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-10 text-zinc-500">No applications found.</td></tr>
                        ) : (
                            filteredApplications.map(app => (
                                <tr 
                                    key={app.id} 
                                    onClick={() => setSelectedApp(app)}
                                    className="hover:bg-zinc-50 cursor-pointer transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-zinc-900">{app.full_name}</div>
                                        <div className="text-xs text-zinc-500">{app.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">{app.position_interest}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">{app.degree_program}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                            {app.graduation_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-500">
                                        {new Date(app.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal / Drawer */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
                    <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between z-10">
                            <h2 className="text-xl font-bold">Application Details</h2>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => handleDelete(selectedApp.id)} 
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                                        deleteStage === 0 ? 'bg-red-50 text-red-600 hover:bg-red-100' : 
                                        deleteStage === 1 ? 'bg-orange-500 text-white' : 
                                        'bg-red-600 text-white animate-pulse'
                                    }`}
                                >
                                    {deleteStage === 0 ? 'Delete Application' : deleteStage === 1 ? 'Are you sure? Click to confirm.' : 'Last warning! Click to permanently delete.'}
                                </button>
                                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-zinc-100 rounded-full">
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-8">
                            
                            <section>
                                <h3 className="text-sm font-bold uppercase text-zinc-400 mb-4 border-b pb-2">1. Personal Info</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-zinc-500 block">Name</span><span className="font-medium">{selectedApp.full_name}</span></div>
                                    <div><span className="text-zinc-500 block">Email</span><span className="font-medium">{selectedApp.email}</span></div>
                                    <div><span className="text-zinc-500 block">Phone</span><span className="font-medium">{selectedApp.contact_number}</span></div>
                                    <div><span className="text-zinc-500 block">Date Applied</span><span className="font-medium">{new Date(selectedApp.created_at).toLocaleString()}</span></div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-sm font-bold uppercase text-zinc-400 mb-4 border-b pb-2">2. Education & Position</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-zinc-500 block">Position</span><span className="font-medium">{selectedApp.position_interest}</span></div>
                                    <div><span className="text-zinc-500 block">Degree</span><span className="font-medium">{selectedApp.degree_program}</span></div>
                                    <div><span className="text-zinc-500 block">Status</span><span className="font-medium">{selectedApp.graduation_status}</span></div>
                                    <div><span className="text-zinc-500 block">Availability</span><span className="font-medium">{selectedApp.availability}</span></div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-sm font-bold uppercase text-zinc-400 mb-4 border-b pb-2">3. Documents</h3>
                                <div className="flex gap-4">
                                    {selectedApp.cv_file_url ? (
                                        <a href={selectedApp.cv_file_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-medium">
                                            View CV File <FaExternalLinkAlt size={12} />
                                        </a>
                                    ) : selectedApp.cv_link ? (
                                        <a href={selectedApp.cv_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-medium">
                                            View CV Link <FaExternalLinkAlt size={12} />
                                        </a>
                                    ) : <span className="text-sm text-zinc-500">No CV provided</span>}

                                    {selectedApp.portfolio_file_url ? (
                                        <a href={selectedApp.portfolio_file_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-medium">
                                            View Portfolio File <FaExternalLinkAlt size={12} />
                                        </a>
                                    ) : selectedApp.portfolio_link ? (
                                        <a href={selectedApp.portfolio_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-medium">
                                            View Portfolio Link <FaExternalLinkAlt size={12} />
                                        </a>
                                    ) : <span className="text-sm text-zinc-500">No Portfolio provided</span>}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-sm font-bold uppercase text-zinc-400 mb-4 border-b pb-2">4. Story & Insights</h3>
                                <div className="space-y-4 text-sm">
                                    <div><span className="text-zinc-500 font-bold block mb-1">Saidpiece Path</span><div className="bg-zinc-50 p-3 rounded">{selectedApp.saidpiece_path || 'N/A'}</div></div>
                                    <div><span className="text-zinc-500 font-bold block mb-1">Exciting Project</span><div className="bg-zinc-50 p-3 rounded">{selectedApp.exciting_project || 'N/A'}</div></div>
                                    <div><span className="text-zinc-500 font-bold block mb-1">Project they are proud of</span><div className="bg-zinc-50 p-3 rounded whitespace-pre-wrap">{selectedApp.proud_project || 'N/A'}</div></div>
                                    <div><span className="text-zinc-500 font-bold block mb-1">Why Saidpiece?</span><div className="bg-zinc-50 p-3 rounded whitespace-pre-wrap">{selectedApp.join_reason || 'N/A'}</div></div>
                                    <div><span className="text-zinc-500 font-bold block mb-1">Any Questions?</span><div className="bg-zinc-50 p-3 rounded whitespace-pre-wrap">{selectedApp.questions || 'N/A'}</div></div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationsAdmin;
