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
        const { data: existing, error: fetchError } = await supabase
            .from('projects')
            .select('id, title, image');

        if (fetchError) throw fetchError;

        const existingProjectsMap = new Map(existing?.map(p => [p.title, p]) || []);
        let importedCount = 0;
        let updatedCount = 0;

        for (const item of portfolioItems) {
            const existingProject = existingProjectsMap.get(item.title);
            let imageUrl = item.image;

            if (item.image) {
                try {
                    const response = await fetch(item.image);
                    const blob = await response.blob();
                    const fileExt = blob.type.split('/')[1] || 'jpg';
                    const fileName = `project_${Date.now()}_${Math.random().toString(36).substr(2, 5)}.${fileExt}`;

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
                    if (existingProject) imageUrl = existingProject.image;
                }
            }

            const projectData = {
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
            };

            if (existingProject) {
                const { error: updateError } = await supabase
                    .from('projects')
                    .update(projectData)
                    .eq('id', existingProject.id);
                if (updateError) throw updateError;
                updatedCount++;
            } else {
                const { error: insertError } = await supabase.from('projects').insert([projectData]);
                if (insertError) throw insertError;
                importedCount++;
            }
        }

        return { success: true, count: importedCount + updatedCount, message: `Processed ${importedCount + updatedCount} projects (${importedCount} new, ${updatedCount} updated).` };
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
        // Fetch existing members to know what to update vs insert
        const { data: existing, error: fetchError } = await supabase
            .from('team_members')
            .select('id, slug, name, avatar');

        if (fetchError) throw fetchError;

        const existingMembersMap = new Map(existing?.map(m => [m.slug, m]) || []);
        let importedCount = 0;
        let updatedCount = 0;

        for (const item of staticTeamMembers) {
            const existingMember = existingMembersMap.get(item.slug);
            let avatarUrl = item.avatar;

            // Upload image if it's a local import (starts with blob or data) or if we want to refresh it
            // For static imports, item.avatar is usually a processed path from Vite
            if (item.avatar) {
                try {
                    const response = await fetch(item.avatar);
                    const blob = await response.blob();
                    const fileExt = blob.type.split('/')[1] || 'jpg';
                    const fileName = `team_${item.slug}_${Date.now()}.${fileExt}`;

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
                    // Keep existing avatar if upload fails and we have one
                    if (existingMember) avatarUrl = existingMember.avatar;
                }
            }

            const memberData = {
                name: item.name,
                role: item.role,
                bio: item.bio,
                avatar: avatarUrl,
                slug: item.slug,
                socials: item.socials
            };

            if (existingMember) {
                const { error: updateError } = await supabase
                    .from('team_members')
                    .update(memberData)
                    .eq('id', existingMember.id);

                if (updateError) throw updateError;
                updatedCount++;
            } else {
                const { error: insertError } = await supabase
                    .from('team_members')
                    .insert([memberData]);

                if (insertError) throw insertError;
                importedCount++;
            }
        }

        return {
            success: true,
            count: importedCount + updatedCount,
            message: `Successfully processed ${importedCount + updatedCount} team members (${importedCount} new, ${updatedCount} updated).`
        };
    } catch (error) {
        console.error("Team import error:", error);
        throw error;
    }
};

/**
 * Imports static insights posts into the database.
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
            return { success: true, count: 0, message: "All insights posts already exist in the database." };
        } else {
            const { error } = await supabase.from('blogs').insert(blogsToInsert);
            if (error) throw error;

            return { success: true, count: blogsToInsert.length, message: `Successfully imported ${blogsToInsert.length} new insights posts.` };
        }
    } catch (error) {
        console.error("Blog import error:", error);
        throw error;
    }
};
