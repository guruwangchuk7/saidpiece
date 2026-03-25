import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaChevronUp, FaChevronDown, FaImage, FaQuoteRight, FaHeading, FaAlignLeft, FaEye, FaPen } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const BlogAdmin = () => {
    // Blog List State
    const [blogs, setBlogs] = useState([]);

    // Blog Form State
    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState('');
    const [domain, setDomain] = useState('News');
    const [author, setAuthor] = useState('');

    // Structured Content State (Block-based)
    const [blocks, setBlocks] = useState([
        { type: 'heading', content: '', label: 'Short Heading Line' },
        { type: 'text', content: '', label: 'One-Sentence Description' },
        { type: 'text', content: '', label: 'First Paragraph (Intro)' },
        { type: 'quote', content: '', label: 'Quote Line' },
        { type: 'text', content: '', label: 'Second Paragraph (Details)' },
    ]);

    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [readTime, setReadTime] = useState('5 min read');

    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Toggle for add/edit mode
    const [showPreview, setShowPreview] = useState(true); // Default to split view if screen allows

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
        setDomain('News');
        setAuthor('');
        setBlocks([
            { type: 'heading', content: '', label: 'Short Heading Line' },
            { type: 'text', content: '', label: 'One-Sentence Description' },
            { type: 'text', content: '', label: 'First Paragraph (Intro)' },
            { type: 'quote', content: '', label: 'Quote Line' },
            { type: 'text', content: '', label: 'Second Paragraph (Details)' },
        ]);
        setReadTime('5 min read');
        setImageFile(null);
        setCurrentImageUrl('');
        setIsEditing(false); // Close form
    };

    const handleEdit = (blog) => {
        setEditingId(blog.id);
        setTitle(blog.title);
        setDomain(blog.domain);
        setAuthor(blog.author);

        // Parse markdown into blocks
        const desc = blog.description || '';
        try {
            const rawParts = desc.split('\n\n').filter(Boolean);
            const parsedBlocks = rawParts.map(part => {
                if (part.startsWith('### ')) return { type: 'heading', content: part.replace('### ', '') };
                if (part.startsWith('> ')) {
                    let q = part.replace('> ', '').trim();
                    if (q.startsWith('"') && q.endsWith('"')) q = q.slice(1, -1);
                    return { type: 'quote', content: q };
                }
                if (part.startsWith('![')) {
                    const match = part.match(/!\[.*\]\((.*)\)/);
                    return { type: 'image', content: match ? match[1] : '', file: null };
                }
                return { type: 'text', content: part };
            });
            setBlocks(parsedBlocks.length > 0 ? parsedBlocks : [
                { type: 'heading', content: '' },
                { type: 'text', content: '' },
                { type: 'text', content: '' },
                { type: 'quote', content: '' },
                { type: 'text', content: '' },
            ]);
        } catch (error) {
            console.error("Error parsing blog description:", error);
            setBlocks([{ type: 'text', content: desc }]);
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
            alert("Insights post deleted successfully");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Error deleting blog");
        }
    };

    const addBlock = (type) => {
        setBlocks([...blocks, { type, content: '', file: null }]);
    };

    const removeBlock = (index) => {
        setBlocks(blocks.filter((_, i) => i !== index));
    };

    const moveBlock = (index, direction) => {
        const newBlocks = [...blocks];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
        [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
        setBlocks(newBlocks);
    };

    const handleBlockChange = (index, value) => {
        const newBlocks = [...blocks];
        newBlocks[index].content = value;
        setBlocks(newBlocks);
    };

    const handleBlockFileChange = (index, file) => {
        const newBlocks = [...blocks];
        newBlocks[index].file = file;
        // Preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            newBlocks[index].content = reader.result;
            setBlocks([...newBlocks]);
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = currentImageUrl;

            // 1. Upload Hero Image if changed
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `hero-${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('blog-images')
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            }

            // 2. Upload Block Images and process markdown
            const processedBlocks = await Promise.all(blocks.map(async (block, i) => {
                if (block.type === 'image' && block.file) {
                    const fileExt = block.file.name.split('.').pop();
                    const fileName = `block-${Date.now()}-${i}.${fileExt}`;
                    const { error: uploadError } = await supabase.storage
                        .from('blog-images')
                        .upload(fileName, block.file);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from('blog-images')
                        .getPublicUrl(fileName);

                    return { ...block, content: publicUrl };
                }
                return block;
            }));

            // 3. Generate Markdown description
            const markdownDescription = processedBlocks.map(block => {
                if (block.type === 'heading') return `### ${block.content}`;
                if (block.type === 'quote') return `> "${block.content}"`;
                if (block.type === 'image') return `![Image](${block.content})`;
                return block.content;
            }).join('\n\n');

            const blogData = {
                title,
                subtitle: domain,
                domain,
                author,
                description: markdownDescription,
                image: imageUrl,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                read_time: readTime,
            };

            if (editingId) {
                const { error } = await supabase.from('blogs').update(blogData).eq('id', editingId);
                if (error) throw error;
                alert("Insights updated successfully!");
            } else {
                const { error } = await supabase.from('blogs').insert([blogData]);
                if (error) throw error;
                alert("Insights published successfully!");
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

    const getGeneratedMarkdown = () => {
        return blocks.map(block => {
            if (block.type === 'heading') return `### ${block.content}`;
            if (block.type === 'quote') return `> "${block.content}"`;
            if (block.type === 'image') return `![Image](${block.content})`;
            return block.content;
        }).join('\n\n');
    };

    return (
        <div className={`${isEditing && showPreview ? 'max-w-full px-4 lg:px-10' : 'max-w-6xl mx-auto'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-zinc-900">Insights Management</h1>
                <div className="flex gap-2">
                    {isEditing && (
                        <div className="flex bg-zinc-100 p-1 rounded-lg border border-zinc-200">
                            <button 
                                onClick={() => setShowPreview(false)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${!showPreview ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-black'}`}
                            >
                                <FaPen size={12} /> Edit
                            </button>
                            <button 
                                onClick={() => setShowPreview(true)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${showPreview ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-black'}`}
                            >
                                <FaEye size={12} /> {window.innerWidth >= 1024 ? 'Split View' : 'Preview'}
                            </button>
                        </div>
                    )}
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                            <FaPlus size={12} /> New Insights Post
                        </button>
                    )}
                </div>
            </div>

            {isEditing ? (
                <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Form Section */}
                    <div className={`${!showPreview ? 'max-w-4xl mx-auto w-full' : ''} bg-white rounded-xl shadow-sm border border-zinc-200 p-6`}>
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

                            <div className="space-y-4 border-t border-zinc-100 pt-6">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-bold uppercase text-black">Article Content</label>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => addBlock('heading')} className="p-2 text-xs flex items-center gap-1 border border-zinc-200 rounded hover:bg-zinc-50 transition-colors">
                                            <FaHeading size={10} /> Heading
                                        </button>
                                        <button type="button" onClick={() => addBlock('text')} className="p-2 text-xs flex items-center gap-1 border border-zinc-200 rounded hover:bg-zinc-50 transition-colors">
                                            <FaAlignLeft size={10} /> Text
                                        </button>
                                        <button type="button" onClick={() => addBlock('quote')} className="p-2 text-xs flex items-center gap-1 border border-zinc-200 rounded hover:bg-zinc-50 transition-colors">
                                            <FaQuoteRight size={10} /> Quote
                                        </button>
                                        <button type="button" onClick={() => addBlock('image')} className="p-2 text-xs flex items-center gap-1 border border-zinc-200 rounded hover:bg-zinc-50 transition-colors">
                                            <FaImage size={10} /> Photo
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 mt-4">
                                    {blocks.map((block, index) => (
                                        <div key={index} className="group relative bg-zinc-50/50 border border-zinc-200 rounded-lg p-4 transition-all hover:bg-white hover:shadow-sm">
                                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-zinc-100 rounded p-1">
                                                <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} className="p-1 text-zinc-400 hover:text-black disabled:opacity-30">
                                                    <FaChevronUp size={10} />
                                                </button>
                                                <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} className="p-1 text-zinc-400 hover:text-black disabled:opacity-30">
                                                    <FaChevronDown size={10} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                                                    {block.type} {block.label ? `— ${block.label}` : ''}
                                                </span>
                                                <button type="button" onClick={() => removeBlock(index)} className="text-zinc-300 hover:text-red-500 transition-colors">
                                                    <FaTrash size={10} />
                                                </button>
                                            </div>

                                            {block.type === 'heading' && (
                                                <input
                                                    type="text"
                                                    required
                                                    value={block.content}
                                                    onChange={(e) => handleBlockChange(index, e.target.value)}
                                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm font-semibold"
                                                    placeholder="Enter heading..."
                                                />
                                            )}

                                            {block.type === 'text' && (
                                                <textarea
                                                    rows={4}
                                                    required
                                                    value={block.content}
                                                    onChange={(e) => handleBlockChange(index, e.target.value)}
                                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm"
                                                    placeholder="Enter paragraph content..."
                                                />
                                            )}

                                            {block.type === 'quote' && (
                                                <input
                                                    type="text"
                                                    required
                                                    value={block.content}
                                                    onChange={(e) => handleBlockChange(index, e.target.value)}
                                                    className="w-full px-3 py-2 border border-zinc-300 rounded focus:ring-black focus:border-black text-sm italic"
                                                    placeholder="Enter quote text..."
                                                />
                                            )}

                                            {block.type === 'image' && (
                                                <div className="space-y-2">
                                                    {(block.content || block.file) && (
                                                        <div className="relative w-full h-32 bg-zinc-100 rounded overflow-hidden">
                                                            <img src={block.content} alt="Preview" className="w-full h-full object-contain" />
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleBlockFileChange(index, e.target.files[0])}
                                                        className="w-full text-xs text-zinc-500"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image</label>
                                {imageFile || currentImageUrl ? (
                                    <div className="mb-2 relative w-full h-32 bg-gray-100 rounded overflow-hidden">
                                        <img src={imageFile ? URL.createObjectURL(imageFile) : currentImageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                ) : null}
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

                    {/* Preview Section */}
                    {showPreview && (
                        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden sticky top-8 h-[calc(100vh-100px)] flex flex-col">
                            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Live Preview</h3>
                                <div className="text-[10px] text-zinc-400">Renders same as blog post</div>
                            </div>
                            <div className="flex-1 overflow-y-auto bg-white p-6 sm:p-10 lg:p-12">
                                {/* Mimic BlogPost structure */}
                                <div className="max-w-2xl mx-auto">
                                    <div className="mb-12">
                                        <h1 className="text-3xl sm:text-4xl font-medium uppercase mb-8 leading-tight text-black">
                                            {title || 'Untitiled Post'}
                                        </h1>

                                        <div className="flex justify-between items-center text-xs uppercase tracking-widest border-t border-b border-zinc-400 py-4 mt-8 text-zinc-600 font-medium flex-wrap gap-2">
                                            <span>Author: {author || 'Your Name'}</span>
                                            <span className="uppercase">{domain}</span>
                                            <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    {/* Main Hero Image Preview in content flow for split layout context */}
                                    {(imageFile || currentImageUrl) && (
                                        <div className="mb-10 lg:hidden">
                                            <img 
                                                src={imageFile ? URL.createObjectURL(imageFile) : currentImageUrl} 
                                                alt="Hero" 
                                                className="w-full aspect-[4/3] object-cover rounded-lg shadow-sm"
                                            />
                                        </div>
                                    )}

                                    <div className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base">
                                        <ReactMarkdown
                                            components={{
                                                h3: ({ node: _node, ...props }) => <h3 className="uppercase text-sm font-bold tracking-widest mb-4 text-zinc-500 mt-8" {...props} />,
                                                p: ({ node: _node, ...props }) => <p className="mb-6 font-light" {...props} />,
                                                blockquote: ({ node: _node, ...props }) => <blockquote className="border-l-2 border-zinc-900 pl-6 italic my-10 text-xl md:text-2xl text-zinc-900 font-serif" {...props} />,
                                                img: ({ node: _node, ...props }) => <img className="w-full rounded-lg my-12 shadow-md border border-zinc-100" {...props} />,
                                            }}
                                        >
                                            {getGeneratedMarkdown()}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
