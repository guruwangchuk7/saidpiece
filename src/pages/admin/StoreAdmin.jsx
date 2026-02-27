import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const StoreAdmin = () => {
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Filter & Loading states
    const [loading, setLoading] = useState(false);

    // Product Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        price: '',
        category: 'furniture',
        stock_quantity: 0,
        is_active: true,
        is_featured: false,
    });
    // For simplicity, we just manage one main image for now
    const [imageFile, setImageFile] = useState(null);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        if (activeTab === 'products') fetchProducts();
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    // Form Handlers
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            price: '',
            category: 'furniture',
            stock_quantity: 0,
            is_active: true,
            is_featured: false,
        });
        setImageFile(null);
        setExistingImages([]);
        setEditId(null);
        setIsEditing(false);
    };

    const handleEditProduct = (product) => {
        setFormData({
            title: product.title,
            slug: product.slug,
            price: product.price,
            category: product.category,
            stock_quantity: product.stock_quantity,
            is_active: product.is_active,
            is_featured: product.is_featured,
        });
        setExistingImages(product.images || []);
        setEditId(product.id);
        setIsEditing(true);
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            toast.success('Product deleted');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Error deleting product');
        }
    };

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let finalImages = [...existingImages];

            // If a new image is selected, upload it and prepend to images array
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `product_${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('blog-images') // Using existing bucket for now
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(fileName);

                finalImages = [publicUrl, ...finalImages];
            }

            const productData = {
                ...formData,
                images: finalImages,
                // Automatically generate slug if empty
                slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            };

            if (editId) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editId);
                if (error) throw error;
                toast.success('Product updated successfully');
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([productData]);
                if (error) throw error;
                toast.success('Product created successfully');
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Error saving product: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Orders Handler
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);
            if (error) throw error;
            toast.success(`Order status updated to ${newStatus}`);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Failed to update order');
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Tabs & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Store Management</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage your products and customer orders</p>
                </div>

                <div className="flex bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
                    <button
                        onClick={() => { setActiveTab('products'); setIsEditing(false); }}
                        className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-50'}`}
                    >
                        <FaBoxOpen /> Products
                    </button>
                    <button
                        onClick={() => { setActiveTab('orders'); setIsEditing(false); }}
                        className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-50 border-l border-zinc-200'}`}
                    >
                        <FaClipboardList /> Orders
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {activeTab === 'products' && (
                <div>
                    {!isEditing && (
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                            >
                                <FaPlus size={12} /> Add New Product
                            </button>
                        </div>
                    )}

                    {isEditing ? (
                        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
                            <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                                <h2 className="text-xl font-bold">{editId ? 'Edit Product' : 'New Product'}</h2>
                                <button onClick={resetForm} className="text-zinc-400 hover:text-black">
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitProduct} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Column 1 */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 mb-1">Title *</label>
                                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 mb-1">Slug (URL)</label>
                                            <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="leave empty to auto-generate" className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 mb-1">Price (formatted) *</label>
                                            <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="e.g. $1,200" required className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                                        </div>
                                    </div>

                                    {/* Column 2 */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black bg-white"
                                            >
                                                <option value="furniture">Furniture</option>
                                                <option value="interior-finishes">Interior Finishes</option>
                                                <option value="lighting-electrical">Lighting & Electrical</option>
                                                <option value="hardware-accessories">Hardware & Accessories</option>
                                                <option value="decor-art">Decor & Art</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 mb-1">Stock Quantity (Set to 0 for Out of Stock)</label>
                                            <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleInputChange} className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-black focus:border-black" />
                                        </div>
                                        <div className="flex gap-6 mt-6">
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer">
                                                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="rounded text-black focus:ring-black h-4 w-4" />
                                                Is Active
                                            </label>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer">
                                                <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleInputChange} className="rounded text-black focus:ring-black h-4 w-4" />
                                                Is Featured
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-100 pt-6 mt-6">
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Primary Product Image</label>
                                    <div className="flex items-center gap-4">
                                        {existingImages && existingImages.length > 0 && !imageFile && (
                                            <img src={existingImages[0]} alt="Preview" className="w-20 h-20 object-cover rounded-md border border-zinc-200" />
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" />
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-2">Uploading a new image will set it as the primary cover image.</p>
                                </div>

                                <div className="flex justify-end gap-3 pt-6">
                                    <button type="button" onClick={resetForm} className="px-4 py-2 text-zinc-600 hover:text-black">Cancel</button>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                                    >
                                        {uploading ? 'Saving...' : (editId ? 'Update Product' : 'Create Product')}
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
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Product</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Price</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Category</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Stock</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-zinc-500">Loading products...</td>
                                            </tr>
                                        ) : products.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-zinc-500">No products found in database.</td>
                                            </tr>
                                        ) : (
                                            products.map((p) => (
                                                <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded bg-zinc-100 shrink-0 overflow-hidden">
                                                                {p.images && p.images.length > 0 ? (
                                                                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full text-zinc-300"><FaImage size={12} /></div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-zinc-900 text-sm">{p.title}</p>
                                                                <p className="text-xs text-zinc-400 truncate max-w-[150px]">{p.slug}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-zinc-700">{p.price}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800 capitalize">
                                                            {p.category.replace('-', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-zinc-600">
                                                        {p.stock_quantity > 0 ? (
                                                            <span>{p.stock_quantity} in stock</span>
                                                        ) : (
                                                            <span className="text-red-500">Out of Stock</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="space-y-1">
                                                            <div>
                                                                {p.is_active ?
                                                                    <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded">Active</span> :
                                                                    <span className="text-zinc-500 text-xs font-medium bg-zinc-100 px-2 py-0.5 rounded">Draft</span>
                                                                }
                                                            </div>
                                                            {p.is_featured && <div>
                                                                <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded">Featured</span>
                                                            </div>}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => handleEditProduct(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                                                                <FaEdit />
                                                            </button>
                                                            <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
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
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Order Ref</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Items & Location</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-zinc-500">Loading orders...</td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-zinc-500">No orders placed yet.</td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                                                    {order.id.split('-')[0]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-sm text-zinc-900">{order.customer_name}</p>
                                                <a
                                                    href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                                    title="Message on WhatsApp"
                                                >
                                                    {order.customer_phone}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-zinc-700 max-w-[200px] truncate mb-1" title={order.delivery_location}>
                                                    <span className="font-semibold">Loc:</span> {order.delivery_location}
                                                </div>
                                                <div className="text-xs text-zinc-500 space-y-0.5">
                                                    {order.items?.map((item, idx) => (
                                                        <div key={idx} className="truncate tracking-wide w-full max-w-[200px]" title={`${item.quantity}x ${item.title} (${item.size})`}>
                                                            • {item.quantity}x {item.title} <span className="opacity-70">({item.size})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                                                Nu. {Number(order.total_amount).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className={`text-xs font-medium px-2 py-1 rounded border-0 cursor-pointer focus:ring-0
                                                        ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                                            order.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                                                                order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                                                                    'bg-amber-50 text-amber-700'}`}
                                                >
                                                    <option value="pending_verification">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-500">
                                                {new Date(order.created_at).toLocaleDateString()}
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

export default StoreAdmin;
