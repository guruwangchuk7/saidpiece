
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
// import { blogItems } from '../../data/blogItems';

const BlogAdmin = () => {
    const navigate = useNavigate();

    const { user, signInWithGoogle, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Blog List State
    const [blogs, setBlogs] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    // Blog Form State
    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('News');
    const [domain, setDomain] = useState('News');
    const [author, setAuthor] = useState('');
    // structured content state
    const [headingLine, setHeadingLine] = useState('');
    const [oneSentenceDesc, setOneSentenceDesc] = useState('');
    const [paragraph1, setParagraph1] = useState('');
    const [quote, setQuote] = useState('');
    const [paragraph2, setParagraph2] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [readTime, setReadTime] = useState('5 min read');

    // ALLOWED EMAIL - CHANGE THIS TO YOUR GMAIL
    const ADMIN_EMAIL = "guruwangchuk1234@gmail.com";

    useEffect(() => {
        if (user && user.email === ADMIN_EMAIL) {
            fetchBlogs();
        }
    }, [user]);

    const fetchBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Mark Supabase items
            const dbPosts = (data || []).map(p => ({ ...p, isStatic: false }));

            // Set only fetched posts to avoid duplicates
            setBlogs(dbPosts);

        } catch (error) {
            console.error("Error fetching blogs:", error);
            setFetchError(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Login failed", error);
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
    };

    const handleEdit = (blog) => {
        if (blog.isStatic) {
            alert("Static blog items cannot be edited here. Update the code in src/data/blogItems.js instead.");
            return;
        }
        setEditingId(blog.id);
        setTitle(blog.title);
        setSubtitle(blog.subtitle || blog.domain);
        setDomain(blog.domain);
        setAuthor(blog.author);
        // Parse markdown description back to fields if possible
        const desc = blog.description || '';
        // unexpected format handling: just dump everything into paragraph1 if we cant parse it simply
        // Simple parser assumption: 
        // ### Heading
        // \n\n
        // Sentence
        // \n\n
        // Para 1
        // \n\n
        // > Quote
        // \n\n
        // Para 2

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
        setImageFile(null); // Reset file input

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id, isStatic) => {
        if (isStatic) {
            alert("Static blog items cannot be deleted here. Remove them from src/data/blogItems.js.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) return;

        try {
            console.log("Attempting to delete blog with ID:", id);
            const { error, count } = await supabase
                .from('blogs')
                .delete({ count: 'exact' })
                .eq('id', id);

            if (error) {
                console.error("Supabase delete error:", error);
                throw error;
            }

            console.log("Delete response count:", count); // Should be 1

            alert("Blog post deleted successfully");
            fetchBlogs();
            if (editingId === id) resetForm();

        } catch (error) {
            console.error("Error deleting blog detailed:", error);
            alert("Error deleting blog: " + (error.message || error.details || "Unknown error"));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || user.email !== ADMIN_EMAIL) {
            alert("Unauthorized");
            return;
        }

        if (!imageFile && !currentImageUrl) {
            alert("Please select an image");
            return;
        }

        try {
            setUploading(true);
            let imageUrl = currentImageUrl;

            // 1. Upload Image if new file selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('blog-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const blogData = {
                title,
                subtitle: domain, // ensuring consistency
                domain,
                author,
                description: `### ${headingLine}\n\n${oneSentenceDesc}\n\n${paragraph1}\n\n> "${quote}"\n\n${paragraph2}`,
                image: imageUrl,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                read_time: readTime,
            };

            if (editingId) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('blogs')
                    .update(blogData)
                    .eq('id', editingId);

                if (updateError) throw updateError;
                alert("Blog updated successfully!");
            } else {
                // Create new
                const { error: insertError } = await supabase
                    .from('blogs')
                    .insert([blogData]);

                if (insertError) throw insertError;
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



    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-6">Blog Admin Login</h1>
                    <button
                        onClick={handleLogin}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full flex items-center justify-center gap-2"
                    >
                        Sign in with Google
                    </button>
                    <button onClick={() => navigate('/')} className="mt-4 text-sm text-gray-500 hover:underline">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (user.email !== ADMIN_EMAIL) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                    <h1 className="text-xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="mb-6">Your email ({user.email}) is not authorized.</p>
                    <button onClick={signOut} className="text-blue-600 underline">Sign Out</button>
                    <div className="mt-4">
                        <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:underline">
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="px-6 py-4 flex justify-between items-center bg-black text-white">
                        <h1 className="text-xl font-bold">Blog Management Dashboard</h1>
                        <span className="text-sm opacity-80 hidden sm:inline">{user.email}</span>
                        <button onClick={signOut} className="text-xs bg-white text-black px-3 py-1 rounded hover:bg-gray-200">Logout</button>
                        <button onClick={() => navigate('/')} className="text-xs border border-white px-3 py-1 rounded hover:bg-white/10">Back to Site</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingId ? 'Edit Post' : 'New Post'}
                            </h2>
                            {editingId && (
                                <button onClick={resetForm} className="text-xs flex items-center gap-1 text-gray-500 hover:text-black">
                                    <FaTimes /> Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
                                />
                            </div>

                            <div>
                                <div className="space-y-4 border-t border-gray-200 pt-4">
                                    <label className="block text-sm font-bold uppercase text-black">Structured Content</label>

                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Short Heading Line</label>
                                        <input
                                            type="text"
                                            required
                                            value={headingLine}
                                            onChange={(e) => setHeadingLine(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
                                            placeholder="E.g. Why we are talking about this"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">One-Sentence Description</label>
                                        <textarea
                                            rows={2}
                                            required
                                            value={oneSentenceDesc}
                                            onChange={(e) => setOneSentenceDesc(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
                                            placeholder="A short summary sentence..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">First Paragraph (Intro)</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={paragraph1}
                                            onChange={(e) => setParagraph1(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
                                            placeholder="Lorem ipsum paragraph..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Quote Line</label>
                                        <input
                                            type="text"
                                            required
                                            value={quote}
                                            onChange={(e) => setQuote(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm italic"
                                            placeholder="Architecture is the will of an epoch..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Second Paragraph (Details)</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={paragraph2}
                                            onChange={(e) => setParagraph2(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-black focus:border-black text-sm"
                                            placeholder="Additional details paragraph..."
                                        />
                                    </div>
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
                                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {uploading ? 'Processing...' : (editingId ? 'Update Post' : 'Publish Post')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Existing Posts</h3>
                        <button onClick={fetchBlogs} className="text-sm text-blue-600 hover:underline">Refresh List</button>
                    </div>

                    {blogs.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
                            No blog posts found. Create one to get started!
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {blogs.map((blog) => (
                                    <li key={blog.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden shrink-0">
                                                {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-base font-semibold text-gray-900 truncate">{blog.title}</h4>
                                                    {blog.isStatic && <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Static</span>}
                                                </div>
                                                <p className="text-sm text-gray-500">{blog.date} • {blog.domain}</p>
                                                <p className="text-xs text-gray-400 truncate mt-1">{blog.description}</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className={`p-2 rounded transition-colors ${blog.isStatic ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                                                    title={blog.isStatic ? "Cannot edit static content" : "Edit"}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog.id, blog.isStatic)}
                                                    className={`p-2 rounded transition-colors ${blog.isStatic ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:bg-red-50'}`}
                                                    title={blog.isStatic ? "Cannot delete static content" : "Delete"}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogAdmin;
