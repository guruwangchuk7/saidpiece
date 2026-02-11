import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage } from 'react-icons/fa';

const ProjectAdmin = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        domain: 'landscape',
        location: '',
        description: '',
        year: '',
        size: '',
        client: '',
        collaboration: '',
        image: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            subtitle: '',
            domain: 'landscape',
            location: '',
            description: '',
            year: '',
            size: '',
            client: '',
            collaboration: '',
            image: ''
        });
        setImageFile(null);
        setEditId(null);
        setIsEditing(false);
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            subtitle: project.subtitle,
            domain: project.domain,
            location: project.location,
            description: project.description,
            year: project.year,
            size: project.size,
            client: project.client,
            collaboration: project.collaboration,
            image: project.image
        });
        setEditId(project.id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.image;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `project_${Date.now()}.${fileExt}`; // distinct prefix
                const { error: uploadError } = await supabase.storage
                    .from('blog-images') // Reusing existing bucket
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            }

            const projectData = { ...formData, image: imageUrl };

            if (editId) {
                const { error } = await supabase
                    .from('projects')
                    .update(projectData)
                    .eq('id', editId);
                if (error) throw error;
                alert('Project updated successfully');
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([projectData]);
                if (error) throw error;
                alert('Project created successfully');
            }

            resetForm();
            fetchProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error saving project: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">Projects Management</h1>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                        <FaPlus size={12} /> Add New Project
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                        <h2 className="text-xl font-bold">{editId ? 'Edit Project' : 'New Project'}</h2>
                        <button onClick={resetForm} className="text-zinc-400 hover:text-black">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Subtitle</label>
                                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Domain</label>
                                <select
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black bg-white"
                                >
                                    <option value="landscape">Landscape</option>
                                    <option value="office">Office</option>
                                    <option value="bank">Bank</option>
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="cafe">Cafe</option>
                                    <option value="hospitality">Hospitality</option>
                                    <option value="institutional">Institutional</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Year</label>
                                <input type="text" name="year" value={formData.year} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Size</label>
                                <input type="text" name="size" value={formData.size} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Client</label>
                                <input type="text" name="client" value={formData.client} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Collaboration</label>
                                <input type="text" name="collaboration" value={formData.collaboration} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                            <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Project Image</label>
                            <div className="flex items-center gap-4">
                                {formData.image && (
                                    <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-md border border-zinc-200" />
                                )}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                            <button type="button" onClick={resetForm} className="px-4 py-2 text-zinc-600 hover:text-black">Cancel</button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Saving...' : (editId ? 'Update Project' : 'Create Project')}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Image</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Title</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Domain</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Year</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {projects.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-zinc-500">No projects found. Add one to get started.</td>
                                    </tr>
                                ) : (
                                    projects.map((project) => (
                                        <tr key={project.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 rounded bg-zinc-100 overflow-hidden">
                                                    {project.image ? (
                                                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-zinc-300"><FaImage /></div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-zinc-900">{project.title}</p>
                                                <p className="text-xs text-zinc-500">{project.subtitle}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 capitalize">
                                                    {project.domain}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-600">{project.year}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectAdmin;
