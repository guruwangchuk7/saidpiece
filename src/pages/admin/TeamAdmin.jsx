import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaGlobe, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const TeamAdmin = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        slug: '',
        avatar: '',
        linkedin: '',
        github: '',
        email: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;
            setTeam(data || []);
        } catch (error) {
            console.error('Error fetching team:', error);
            setError(error.message);
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
            name: '',
            role: '',
            bio: '',
            slug: '',
            avatar: '',
            linkedin: '',
            github: '',
            email: ''
        });
        setImageFile(null);
        setEditId(null);
        setIsEditing(false);
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio,
            slug: member.slug,
            avatar: member.avatar,
            linkedin: member.socials?.linkedin || '',
            github: member.socials?.github || '',
            email: member.socials?.email || ''
        });
        setEditId(member.id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this team member? This action cannot be undone.")) return;

        try {
            const { error } = await supabase.from('team_members').delete().eq('id', id);
            if (error) throw error;
            fetchTeam();
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Error deleting member');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let avatarUrl = formData.avatar;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `team_${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('blog-images') // Reusing bucket
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(fileName);

                avatarUrl = publicUrl;
            }

            // Generate slug if empty
            let slug = formData.slug;
            if (!slug) {
                slug = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            }

            const memberData = {
                name: formData.name,
                role: formData.role,
                bio: formData.bio,
                slug: slug,
                avatar: avatarUrl,
                socials: {
                    linkedin: formData.linkedin,
                    github: formData.github,
                    email: formData.email
                }
            };

            if (editId) {
                const { error } = await supabase
                    .from('team_members')
                    .update(memberData)
                    .eq('id', editId);
                if (error) throw error;
                alert('Team member updated successfully');
            } else {
                const { error } = await supabase
                    .from('team_members')
                    .insert([memberData]);
                if (error) throw error;
                alert('Team member added successfully');
            }

            resetForm();
            fetchTeam();
        } catch (error) {
            console.error('Error saving member:', error);
            alert('Error saving member: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">Team Management</h1>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                        <FaPlus size={12} /> Add Team Member
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                        <h2 className="text-xl font-bold">{editId ? 'Edit Team Member' : 'New Team Member'}</h2>
                        <button onClick={resetForm} className="text-zinc-400 hover:text-black">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Role</label>
                                <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Bio</label>
                                <textarea name="bio" rows="3" value={formData.bio} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Unique Slug (URL)</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="Auto-generated if empty" className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Avatar</label>
                                <div className="flex items-center gap-4">
                                    {formData.avatar && (
                                        <img src={formData.avatar} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-zinc-200" />
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-zinc-100 pt-4">
                            <h3 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-wider">Social Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">LinkedIn URL</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                            <FaLinkedin />
                                        </div>
                                        <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full pl-10 px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">GitHub URL</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                            <FaGithub />
                                        </div>
                                        <input type="url" name="github" value={formData.github} onChange={handleInputChange} className="w-full pl-10 px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                            <FaEnvelope />
                                        </div>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                            <button type="button" onClick={resetForm} className="px-4 py-2 text-zinc-600 hover:text-black">Cancel</button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Saving...' : (editId ? 'Update Member' : 'Add Member')}
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
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Avatar</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Details</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {team.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-zinc-500">No team members found.</td>
                                    </tr>
                                ) : (
                                    team.map((member) => (
                                        <tr key={member.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden">
                                                    {member.avatar ? (
                                                        <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 text-xs">N/A</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-zinc-900">{member.name}</p>
                                                <p className="text-xs text-zinc-500">{member.socials?.email}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(member)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(member.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
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

export default TeamAdmin;
