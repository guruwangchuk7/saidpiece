import { supabase } from '../services/supabaseClient';
import { portfolioItems } from '../data/portfolioItems';
import { blogItems } from '../data/blogItems';
import { staticTeamMembers } from '../data/staticTeam';

/**
 * Imports static portfolio projects into the database.
 * checks for existing projects by title to avoid duplicates.
 */
export const importProjects = async () => {
    try {
        // Check for existing projects by title to avoid duplicates
        const { data: existing, error: fetchError } = await supabase
            .from('projects')
            .select('title');

        if (fetchError) throw fetchError;

        const existingTitles = new Set(existing?.map(p => p.title) || []);
        const projectsToInsert = [];

        for (const item of portfolioItems) {
            // Skip if already exists
            if (existingTitles.has(item.title)) continue;

            let imageUrl = item.image;
            // Upload image if it exists
            if (item.image) {
                try {
                    const response = await fetch(item.image);
                    const blob = await response.blob();
                    const fileExt = blob.type.split('/')[1] || 'jpg';
                    const fileName = `project_import_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                    const { error: uploadError } = await supabase.storage
                        .from('blog-images')
                        .upload(fileName, blob);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from('blog-images')
                        .getPublicUrl(fileName);

                    imageUrl = publicUrl;
                } catch (err) {
                    console.error(`Failed to upload image for ${item.title}:`, err);
                }
            }

            projectsToInsert.push({
                title: item.title,
                subtitle: item.subtitle,
                domain: item.domain,
                location: item.location,
                description: item.description,
                image: imageUrl,
                year: item.year,
                size: item.size,
                client: item.client,
                collaboration: item.collaboration
            });
        }

        if (projectsToInsert.length === 0) {
            return { success: true, count: 0, message: "All projects already exist in the database." };
        } else {
            const { error } = await supabase.from('projects').insert(projectsToInsert);
            if (error) throw error;

            return { success: true, count: projectsToInsert.length, message: `Successfully imported ${projectsToInsert.length} new projects.` };
        }
    } catch (error) {
        console.error("Project import error:", error);
        throw error;
    }
};

/**
 * Imports static team members into the database.
 * checks for existing members by name/slug to avoid duplicates.
 */
export const importTeam = async () => {
    try {
        // Check for existing members by name/slug to avoid duplicates
        const { data: existing, error: fetchError } = await supabase
            .from('team_members')
            .select('slug, name');

        if (fetchError) throw fetchError;

        const existingSlugs = new Set(existing?.map(m => m.slug) || []);
        const existingNames = new Set(existing?.map(m => m.name) || []);
        const teamToInsert = [];

        for (const item of staticTeamMembers) {
            if (existingSlugs.has(item.slug) || existingNames.has(item.name)) continue;

            let avatarUrl = item.avatar;
            if (item.avatar) {
                try {
                    const response = await fetch(item.avatar);
                    const blob = await response.blob();
                    const fileExt = blob.type.split('/')[1] || 'jpg';
                    const fileName = `team_import_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                    const { error: uploadError } = await supabase.storage
                        .from('blog-images')
                        .upload(fileName, blob);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from('blog-images')
                        .getPublicUrl(fileName);

                    avatarUrl = publicUrl;
                } catch (err) {
                    console.error(`Failed to upload avatar for ${item.name}:`, err);
                }
            }

            teamToInsert.push({
                name: item.name,
                role: item.role,
                bio: item.bio,
                avatar: avatarUrl,
                slug: item.slug,
                socials: item.socials
            });
        }

        if (teamToInsert.length === 0) {
            return { success: true, count: 0, message: "All team members already exist in the database." };
        } else {
            const { error } = await supabase.from('team_members').insert(teamToInsert);
            if (error) throw error;

            return { success: true, count: teamToInsert.length, message: `Successfully imported ${teamToInsert.length} new team members.` };
        }
    } catch (error) {
        console.error("Team import error:", error);
        throw error;
    }
};

/**
 * Imports static blog posts into the database.
 * checks for existing posts by title to avoid duplicates.
 */
export const importBlogs = async () => {
    try {
        // Check for existing blogs by title
        const { data: existing, error: fetchError } = await supabase
            .from('blogs')
            .select('title');

        if (fetchError) throw fetchError;

        const existingTitles = new Set(existing?.map(b => b.title) || []);
        const blogsToInsert = [];

        for (const item of blogItems) {
            if (existingTitles.has(item.title)) continue;

            let imageUrl = item.image;
            if (item.image) {
                try {
                    const response = await fetch(item.image);
                    const blob = await response.blob();
                    const fileExt = blob.type.split('/')[1] || 'jpg';
                    const fileName = `blog_import_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                    const { error: uploadError } = await supabase.storage
                        .from('blog-images')
                        .upload(fileName, blob);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from('blog-images')
                        .getPublicUrl(fileName);

                    imageUrl = publicUrl;
                } catch (err) {
                    console.error(`Failed to upload image for ${item.title}:`, err);
                }
            }

            blogsToInsert.push({
                title: item.title,
                subtitle: item.subtitle,
                domain: item.domain,
                author: item.author,
                description: item.description,
                image: imageUrl,
                date: item.date,
                read_time: item.readTime
            });
        }

        if (blogsToInsert.length === 0) {
            return { success: true, count: 0, message: "All blog posts already exist in the database." };
        } else {
            const { error } = await supabase.from('blogs').insert(blogsToInsert);
            if (error) throw error;

            return { success: true, count: blogsToInsert.length, message: `Successfully imported ${blogsToInsert.length} new blog posts.` };
        }
    } catch (error) {
        console.error("Blog import error:", error);
        throw error;
    }
};
