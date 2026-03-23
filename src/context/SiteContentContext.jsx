import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const SiteContentContext = createContext();

export function useSiteContent() {
    return useContext(SiteContentContext);
}

export function SiteContentProvider({ children }) {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            // Incase we add caching here later, we can check localStorage
            const { data, error } = await supabase.from('site_content').select('*');
            if (error) {
                console.error("Error fetching site content:", error);
                return;
            }
            if (data) {
                const formattedContent = data.reduce((acc, curr) => {
                    acc[curr.id] = curr.content;
                    return acc;
                }, {});
                setContent(formattedContent);
            }
        } catch (error) {
            console.error("Error fetching site content:", error);
        } finally {
            setLoading(false);
        }
    };

    const value = { content, setContent, refreshContent: fetchContent, loading };

    return (
        <SiteContentContext.Provider value={value}>
            {children}
        </SiteContentContext.Provider>
    );
}
