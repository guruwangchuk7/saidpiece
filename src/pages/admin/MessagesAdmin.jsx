import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaTrash, FaEnvelope, FaSpinner, FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const MessagesAdmin = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                // If the table doesn't exist, we might get an error here.
                if (error.message && error.message.includes('relation "messages" does not exist')) {
                    toast.error("The 'messages' table does not exist. Please create it in Supabase.");
                } else {
                    toast.error("Failed to fetch messages");
                }
                console.error("Error fetching messages:", error);
            } else {
                setMessages(data || []);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation(); // Prevent opening the message when clicking delete
        if (!window.confirm("Are you sure you want to delete this message? This action cannot be undone.")) return;

        try {
            const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMessages(messages.filter(m => m.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
            toast.success("Message deleted successfully");
        } catch (error) {
            console.error("Error deleting message:", error);
            toast.error("Failed to delete message");
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <FaSpinner className="animate-spin text-3xl text-zinc-400" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight uppercase">Messages</h1>
                    <p className="text-zinc-500 text-sm mt-1">View and manage inquiries from the contact form.</p>
                </div>

                <div className="relative w-full md:w-64">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                {/* Message List */}
                <div className="lg:col-span-1 bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
                    <div className="p-4 border-b border-zinc-100 bg-zinc-50 font-semibold text-zinc-700 flex justify-between items-center">
                        <span>Inbox</span>
                        <span className="text-xs bg-zinc-200 px-2 py-1 rounded-full text-zinc-600">{filteredMessages.length}</span>
                    </div>
                    <div className="overflow-y-auto flex-1 divide-y divide-zinc-100">
                        {filteredMessages.length === 0 ? (
                            <div className="p-8 text-center text-zinc-400 text-sm">
                                {searchTerm ? 'No messages found matching your search.' : 'No messages yet.'}
                            </div>
                        ) : (
                            filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    onClick={() => setSelectedMessage(message)}
                                    className={`p-4 cursor-pointer hover:bg-zinc-50 transition-colors ${selectedMessage?.id === message.id ? 'bg-zinc-50 border-l-4 border-zinc-900' : 'border-l-4 border-transparent'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-semibold text-sm truncate pr-2 ${selectedMessage?.id === message.id ? 'text-zinc-900' : 'text-zinc-700'}`}>
                                            {message.name}
                                        </h3>
                                        <span className="text-[10px] text-zinc-400 shrink-0 whitespace-nowrap">
                                            {new Date(message.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-500 truncate mb-2">{message.email}</p>
                                    <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                                        {message.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                    {selectedMessage ? (
                        <>
                            <div className="p-6 border-b border-zinc-100 flex justify-between items-start bg-zinc-50/50">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500 font-bold text-lg shrink-0">
                                        {selectedMessage.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-zinc-900">{selectedMessage.name}</h2>
                                        <a href={`mailto:${selectedMessage.email}`} className="text-zinc-500 text-sm hover:text-zinc-900 hover:underline flex items-center gap-1 mt-1 transition-colors">
                                            <FaEnvelope size={12} /> {selectedMessage.email}
                                        </a>
                                        <p className="text-xs text-zinc-400 mt-2">
                                            Sent on {formatDate(selectedMessage.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => handleDelete(selectedMessage.id, e)}
                                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Message"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="p-8 overflow-y-auto flex-1">
                                <p className="text-zinc-800 whitespace-pre-wrap leading-relaxed">
                                    {selectedMessage.message}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-400 p-8 text-center opacity-60">
                            <FaEnvelope size={48} className="mb-4 text-zinc-200" />
                            <p className="text-lg font-medium text-zinc-500">Select a message to read</p>
                            <p className="text-sm mt-2 max-w-xs">Choose a message from the list on the left to view its full details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesAdmin;
