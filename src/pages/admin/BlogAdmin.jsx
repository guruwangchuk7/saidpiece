import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const BlogAdmin = () => {
    // Blog List State
    const [blogs, setBlogs] = useState([]);

    // Blog Form State
    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('News');
    const [domain, setDomain] = useState('News');
    const [author, setAuthor] = useState('');

    // Structured Content State
    const [headingLine, setHeadingLine] = useState('');
    const [oneSentenceDesc, setOneSentenceDesc] = useState('');
    const [paragraph1, setParagraph1] = useState('');
    const [quote, setQuote] = useState('');
    const [paragraph2, setParagraph2] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [readTime, setReadTime] = useState('5 min read');

    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Toggle for add/edit mode

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBlogs(data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setSubtitle('News');
        setDomain('News');
        setAuthor('');
        setHeadingLine('');
        setOneSentenceDesc('');
        setParagraph1('');
        setQuote('');
        setParagraph2('');
        setReadTime('5 min read');
        setImageFile(null);
        setCurrentImageUrl('');
        setIsEditing(false); // Close form
    };

    const handleEdit = (blog) => {
        setEditingId(blog.id);
        setTitle(blog.title);
        setSubtitle(blog.subtitle || blog.domain);
        setDomain(blog.domain);
        setAuthor(blog.author);

        // Parse markdown
        const desc = blog.description || '';
        try {
            const parts = desc.split('\n\n');
            if (parts.length >= 1) setHeadingLine(parts[0].replace('### ', ''));
            if (parts.length >= 2) setOneSentenceDesc(parts[1]);
            if (parts.length >= 3) setParagraph1(parts[2]);
            if (parts.length >= 4) setQuote(parts[3].replace('> ', '').replace(/"/g, ''));
            if (parts.length >= 5) setParagraph2(parts.slice(4).join('\n\n'));
        } catch (e) {
            setParagraph1(desc);
        }

        setReadTime(blog.read_time || '5 min read');
        setCurrentImageUrl(blog.image);
        setIsEditing(true); // Open form

        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) return;

        try {
            const { error } = await supabase
                .from('blogs')
                .delete({ count: 'exact' })
                .eq('id', id);

            if (error) throw error;
            fetchBlogs();
            if (editingId === id) resetForm();
            alert("Blog post deleted successfully");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Error deleting blog");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = currentImageUrl;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('blog-images')
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            }

            const blogData = {
                title,
                subtitle: domain,
                domain,
                author,
                description: `### ${headingLine}\n\n${oneSentenceDesc}\n\n${paragraph1}\n\n> "${quote}"\n\n${paragraph2}`,
                image: imageUrl,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                read_time: readTime,
            };

            if (editingId) {
                const { error } = await supabase.from('blogs').update(blogData).eq('id', editingId);
                if (error) throw error;
                alert("Blog updated successfully!");
            } else {
                const { error } = await supabase.from('blogs').insert([blogData]);
                if (error) throw error;
                alert("Blog published successfully!");
            }

            resetForm();
            fetchBlogs();
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Error saving blog: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">Blog Management</h1>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                        <FaPlus size={12} /> New Blog Post
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 mb-8">
                    <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                        <h2 className="text-xl font-bold">{editingId ? 'Edit Post' : 'New Post'}</h2>
                        <button onClick={resetForm} className="text-zinc-400 hover:text-black">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                                placeholder="Enter blog title"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                                <select
                                    value={domain}
                                    onChange={(e) => {
                                        setDomain(e.target.value);
                                        setSubtitle(e.target.value);
                                    }}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm bg-white"
                                >
                                    <option value="News">News</option>
                                    <option value="Articles">Articles</option>
                                    <option value="Publications">Publications</option>
                                    <option value="Research">Research</option>
                                    <option value="events">Events</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Read Time</label>
                                <input
                                    type="text"
                                    value={readTime}
                                    onChange={(e) => setReadTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Author</label>
                            <input
                                type="text"
                                required
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                            />
                        </div>

                        <div className="space-y-4 border-t border-zinc-100 pt-4">
                            <label className="block text-sm font-bold uppercase text-black">Structured Content</label>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Short Heading Line</label>
                                <input
                                    type="text"
                                    required
                                    value={headingLine}
                                    onChange={(e) => setHeadingLine(e.target.value)}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">One-Sentence Description</label>
                                <textarea
                                    rows={2}
                                    required
                                    value={oneSentenceDesc}
                                    onChange={(e) => setOneSentenceDesc(e.target.value)}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">First Paragraph (Intro)</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={paragraph1}
                                    onChange={(e) => setParagraph1(e.target.value)}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Quote Line</label>
                                <input
                                    type="text"
                                    required
                                    value={quote}
                                    onChange={(e) => setQuote(e.target.value)}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm italic"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Second Paragraph (Details)</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={paragraph2}
                                    onChange={(e) => setParagraph2(e.target.value)}
                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image</label>
                            {currentImageUrl && (
                                <div className="mb-2 relative w-full h-32 bg-gray-100 rounded overflow-hidden">
                                    <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full text-xs text-zinc-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                            <button type="button" onClick={resetForm} className="px-4 py-2 text-zinc-600 hover:text-black">Cancel</button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Processing...' : (editingId ? 'Update Post' : 'Publish Post')}
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
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Date/Domain</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-12 bg-zinc-200 rounded overflow-hidden">
                                                {blog.image && <img src={blog.image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-zinc-900 truncate max-w-xs">{blog.title}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-500">
                                            {blog.date} • {blog.domain}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {blogs.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-zinc-500">No blogs found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogAdmin;
