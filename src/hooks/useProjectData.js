import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { portfolioItems as staticPortfolioItems } from '../data/portfolioItems';

/**
 * Custom hook to fetch a single project and its next project.
 * It first tries to fetch from Supabase, and falls back to static data if not found or on error.
 * 
 * @param {string|number} id - The ID of the project to fetch.
 * @returns {object} - An object containing { project, nextProject, loading, error }
 */
export const useProjectData = (id) => {
    const [project, setProject] = useState(null);
    const [nextProject, setNextProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                // 1. Try to fetch from Supabase
                const { data: dbProjects, error: dbError } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                let allProjects = [];

                // Use static data if DB is empty or fails
                if (dbError || !dbProjects || dbProjects.length === 0) {
                    if (dbError) console.warn("Supabase fetch failed, falling back to static data:", dbError);
                    allProjects = staticPortfolioItems;
                } else {
                    allProjects = dbProjects;
                }

                // Find the project in the combined list
                // Use strict equality if IDs are consistent, but loose equality (==) helps mix string/number IDs
                const projectIndex = allProjects.findIndex(p => p.id == id);

                if (projectIndex !== -1) {
                    setProject(allProjects[projectIndex]);
                    const nextIdx = (projectIndex + 1) % allProjects.length;
                    setNextProject(allProjects[nextIdx]);
                } else {
                    // Start of fallback logic if not found in the initial list (e.g. if DB had some items but not this one)
                    // If not found in combined list, try static specifically as a last resort backup
                    const staticIdx = staticPortfolioItems.findIndex(p => p.id == id);
                    if (staticIdx !== -1) {
                        setProject(staticPortfolioItems[staticIdx]);
                        const nextIdx = (staticIdx + 1) % staticPortfolioItems.length;
                        setNextProject(staticPortfolioItems[nextIdx]);
                    } else {
                        setError("Project not found");
                    }
                }
            } catch (err) {
                console.error("Error fetching project gallery data:", err);
                // Final fallback attempts in case of catastrophic error
                const staticIdx = staticPortfolioItems.findIndex(p => p.id == id);
                if (staticIdx !== -1) {
                    setProject(staticPortfolioItems[staticIdx]);
                    setNextProject(staticPortfolioItems[(staticIdx + 1) % staticPortfolioItems.length]);
                } else {
                    setError("Project not found");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [id]);

    return { project, nextProject, loading, error };
};
