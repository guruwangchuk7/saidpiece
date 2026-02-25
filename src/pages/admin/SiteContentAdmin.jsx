import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { toast } from 'react-hot-toast';
import { useSiteContent } from '../../context/SiteContentContext';
import { FaSave, FaImage, FaSpinner } from 'react-icons/fa';

const SiteContentAdmin = () => {
    const { content, refreshContent } = useSiteContent();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    // --- Local States for Each Section ---
    const [homeHeroData, setHomeHeroData] = useState({ titlePart1: 'said', titlePart2: 'piece', titlePart3: 'architects', image_url: '' });
    const [homeHeroImageFile, setHomeHeroImageFile] = useState(null);

    const [homeAboutData, setHomeAboutData] = useState({
        heading: 'STUDIO OF ARCHITECTURE AND ENGINEERING',
        about: 'Saidpiece Architects has completed projects across Bhutan and abroad, specializing in architectural design, urban planning, interior design, engineering, and construction consultancy. Guided by the principles of Gross National Happiness, we merge sustainability, creativity, and precision to deliver innovative, culturally authentic design solutions.',
        publication: 'Our work aspires to contribute to leading global and regional design platforms and journals, sharing Bhutan’s unique architectural vision with the world.',
        image_url: ''
    });
    const [homeAboutImageFile, setHomeAboutImageFile] = useState(null);

    const [navData, setNavData] = useState({ titlePart1: 'said', titlePart2: 'piece', tagline: 'STORE | ART FOUNDATION' });

    const [aboutData, setAboutData] = useState({
        heroHeading: 'saidpiece architects', heroImage_url: '',
        introTitle: 'Saidpiece Architects is a registered\nBhutanese firm specializing in\narchitectural and engineering solutions.',
        introDescription: 'Located at Namgyal Plaza, Thimphu (CDB No. 312; Trade License No. 1052642), we provide full-spectrum professional services encompassing design, documentation, and project delivery, from concept to completion. Founded in 2023, Saidpiece was born from a vision to merge Bhutanese tradition with modern innovation. Our work is rooted in the belief that architecture is not merely the creation of buildings, but the crafting of environments that foster balance between human experience, culture, and nature.',
        introImage_url: '',
        expertiseHeading: 'Our Expertise', expertiseTagline: 'Full-spectrum professional services from concept to completion.',
        visionQuote: 'Saidpiece Architects is a Bhutan-based multi-disciplinary and construction firm specializing in innovative sustainable designs.',
        visionDescription: 'Offering full turn key services from concept development to project completion, we focus on creating functional, aesthetic and mindful spaces with an emphasis on innovation and sustainability.',
        visionImage_url: ''
    });
    const [aboutHeroImageFile, setAboutHeroImageFile] = useState(null);
    const [aboutIntroImageFile, setAboutIntroImageFile] = useState(null);
    const [aboutVisionImageFile, setAboutVisionImageFile] = useState(null);

    const [contactData, setContactData] = useState({
        heading: "LET'S TALK?", email: 'thinley@saidpiece.com', phoneBht: '+975 17899794 (BHT)', phoneTh: '+66 931205085 (TH)',
        instagram: 'https://www.instagram.com/saidpiece_architects', facebook: 'https://www.facebook.com/saidpiece.architects', linkedin: 'https://www.linkedin.com/company/saidpiece/',
        image_url: ''
    });
    const [contactImageFile, setContactImageFile] = useState(null);

    // --- Data Sync ---
    useEffect(() => {
        if (content.home_hero) setHomeHeroData(prev => ({ ...prev, ...content.home_hero }));
        if (content.home_about) setHomeAboutData(prev => ({ ...prev, ...content.home_about }));
        if (content.nav) setNavData(prev => ({ ...prev, ...content.nav }));
        if (content.about_page) setAboutData(prev => ({ ...prev, ...content.about_page }));
        if (content.contact_page) setContactData(prev => ({ ...prev, ...content.contact_page }));
    }, [content]);

    // --- Generic Image Upload Helper ---
    const uploadImage = async (file, prefix) => {
        if (!file) return null;
        const fileExt = file.name.split('.').pop();
        const fileName = `${prefix}_${Date.now()}.${fileExt}`;
        const filePath = `site_content/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file);

        if (uploadError) {
            throw new Error(`Failed to upload ${prefix} image: ` + uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    // --- Save Handlers ---
    const handleSaveHome = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Save Hero
            const newHeroImageUrl = await uploadImage(homeHeroImageFile, 'home_hero') || homeHeroData.image_url;
            const finalHeroData = { ...homeHeroData, image_url: newHeroImageUrl };
            await supabase.from('site_content').upsert({ id: 'home_hero', content: finalHeroData });

            // Save About Preview (H2)
            const newAboutImageUrl = await uploadImage(homeAboutImageFile, 'home_about') || homeAboutData.image_url;
            const finalAboutData = { ...homeAboutData, image_url: newAboutImageUrl };
            await supabase.from('site_content').upsert({ id: 'home_about', content: finalAboutData });

            toast.success("Home content updated!");
            setHomeHeroImageFile(null);
            setHomeAboutImageFile(null);
            refreshContent();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNav = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await supabase.from('site_content').upsert({ id: 'nav', content: navData });
            toast.success("Navigation content updated!");
            refreshContent();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAbout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const hUrl = await uploadImage(aboutHeroImageFile, 'about_hero') || aboutData.heroImage_url;
            const iUrl = await uploadImage(aboutIntroImageFile, 'about_intro') || aboutData.introImage_url;
            const vUrl = await uploadImage(aboutVisionImageFile, 'about_vision') || aboutData.visionImage_url;

            const finalData = { ...aboutData, heroImage_url: hUrl, introImage_url: iUrl, visionImage_url: vUrl };
            await supabase.from('site_content').upsert({ id: 'about_page', content: finalData });

            toast.success("About page content updated!");
            setAboutHeroImageFile(null);
            setAboutIntroImageFile(null);
            setAboutVisionImageFile(null);
            refreshContent();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveContact = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newImgUrl = await uploadImage(contactImageFile, 'contact') || contactData.image_url;
            const finalData = { ...contactData, image_url: newImgUrl };
            await supabase.from('site_content').upsert({ id: 'contact_page', content: finalData });

            toast.success("Contact page content updated!");
            setContactImageFile(null);
            refreshContent();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- UI Helpers ---
    const InputField = ({ label, value, onChange, isTextarea }) => (
        <div className="mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide mb-2">{label}</label>
            {isTextarea ? (
                <textarea rows="4" value={value || ''} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none" />
            ) : (
                <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            )}
        </div>
    );

    const ImageUploadField = ({ label, currentUrl, fileState, setFileState }) => {
        const previewUrl = fileState ? URL.createObjectURL(fileState) : currentUrl;
        return (
            <div className="mb-6">
                <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide mb-2">{label}</label>
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FaImage className="w-8 h-8 mb-3 text-zinc-400" />
                                <p className="mb-2 text-sm text-zinc-500 font-medium">Click to upload new image</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => { if (e.target.files[0]) setFileState(e.target.files[0]) }} />
                        </label>
                    </div>
                    {previewUrl && (
                        <div className="w-48 h-32 shrink-0 rounded-lg border border-zinc-200 overflow-hidden bg-zinc-100">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 uppercase tracking-tight mb-2">Site Settings</h1>
                <p className="text-zinc-500">Manage global website content, text, and media imagery across pages.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-zinc-200 mb-8 overflow-x-auto pb-2">
                {['home', 'nav', 'about', 'contact'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-zinc-900 text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm">

                {/* --- HOME TAB --- */}
                {activeTab === 'home' && (
                    <form onSubmit={handleSaveHome}>
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b pb-2">Homepage Hero</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <InputField label="Title Part 1" value={homeHeroData.titlePart1} onChange={(val) => setHomeHeroData({ ...homeHeroData, titlePart1: val })} />
                            <InputField label="Title Part 2" value={homeHeroData.titlePart2} onChange={(val) => setHomeHeroData({ ...homeHeroData, titlePart2: val })} />
                            <InputField label="Title Part 3" value={homeHeroData.titlePart3} onChange={(val) => setHomeHeroData({ ...homeHeroData, titlePart3: val })} />
                        </div>
                        <ImageUploadField label="Hero Image (Desktop/Tablet)" currentUrl={homeHeroData.image_url} fileState={homeHeroImageFile} setFileState={setHomeHeroImageFile} />

                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 mt-12 border-b pb-2">Homepage About Section</h2>
                        <InputField label="Heading" value={homeAboutData.heading} onChange={(val) => setHomeAboutData({ ...homeAboutData, heading: val })} />
                        <InputField label="About Us Text" value={homeAboutData.about} onChange={(val) => setHomeAboutData({ ...homeAboutData, about: val })} isTextarea />
                        <InputField label="Publications Text" value={homeAboutData.publication} onChange={(val) => setHomeAboutData({ ...homeAboutData, publication: val })} isTextarea />
                        <ImageUploadField label="Section Image" currentUrl={homeAboutData.image_url} fileState={homeAboutImageFile} setFileState={setHomeAboutImageFile} />

                        <div className="pt-6 border-t border-zinc-100 flex justify-end">
                            <button type="submit" disabled={loading} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2 font-bold uppercase tracking-wide text-sm disabled:opacity-50">
                                {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Home Content
                            </button>
                        </div>
                    </form>
                )}

                {/* --- NAV TAB --- */}
                {activeTab === 'nav' && (
                    <form onSubmit={handleSaveNav}>
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b pb-2">Navigation Bar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Logo Part 1 (Light)" value={navData.titlePart1} onChange={(val) => setNavData({ ...navData, titlePart1: val })} />
                            <InputField label="Logo Part 2 (Bold)" value={navData.titlePart2} onChange={(val) => setNavData({ ...navData, titlePart2: val })} />
                            <InputField label="Tagline (Desktop Center)" value={navData.tagline} onChange={(val) => setNavData({ ...navData, tagline: val })} />
                        </div>
                        <div className="pt-6 mt-4 border-t border-zinc-100 flex justify-end">
                            <button type="submit" disabled={loading} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2 font-bold uppercase tracking-wide text-sm disabled:opacity-50">
                                {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Nav Content
                            </button>
                        </div>
                    </form>
                )}

                {/* --- ABOUT TAB --- */}
                {activeTab === 'about' && (
                    <form onSubmit={handleSaveAbout}>
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b pb-2">Hero Section</h2>
                        <InputField label="Hero Heading" value={aboutData.heroHeading} onChange={(val) => setAboutData({ ...aboutData, heroHeading: val })} />
                        <ImageUploadField label="Hero Banner Image" currentUrl={aboutData.heroImage_url} fileState={aboutHeroImageFile} setFileState={setAboutHeroImageFile} />

                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 mt-12 border-b pb-2">Intro Section</h2>
                        <InputField label="Intro Title" value={aboutData.introTitle} onChange={(val) => setAboutData({ ...aboutData, introTitle: val })} isTextarea />
                        <InputField label="Intro Description" value={aboutData.introDescription} onChange={(val) => setAboutData({ ...aboutData, introDescription: val })} isTextarea />
                        <ImageUploadField label="Intro Vertical Image" currentUrl={aboutData.introImage_url} fileState={aboutIntroImageFile} setFileState={setAboutIntroImageFile} />

                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 mt-12 border-b pb-2">Expertise Section</h2>
                        <InputField label="Expertise Heading" value={aboutData.expertiseHeading} onChange={(val) => setAboutData({ ...aboutData, expertiseHeading: val })} />
                        <InputField label="Expertise Tagline" value={aboutData.expertiseTagline} onChange={(val) => setAboutData({ ...aboutData, expertiseTagline: val })} />
                        {/* Note: List of 8 items are left hardcoded for layout stability, but could be dynamic if needed */}

                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 mt-12 border-b pb-2">Vision / Team Section</h2>
                        <InputField label="Quote/Headline" value={aboutData.visionQuote} onChange={(val) => setAboutData({ ...aboutData, visionQuote: val })} isTextarea />
                        <InputField label="Vision Description" value={aboutData.visionDescription} onChange={(val) => setAboutData({ ...aboutData, visionDescription: val })} isTextarea />
                        <ImageUploadField label="Team/Vision Image" currentUrl={aboutData.visionImage_url} fileState={aboutVisionImageFile} setFileState={setAboutVisionImageFile} />

                        <div className="pt-6 border-t border-zinc-100 flex justify-end">
                            <button type="submit" disabled={loading} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2 font-bold uppercase tracking-wide text-sm disabled:opacity-50">
                                {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} Save About Content
                            </button>
                        </div>
                    </form>
                )}

                {/* --- CONTACT TAB --- */}
                {activeTab === 'contact' && (
                    <form onSubmit={handleSaveContact}>
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b pb-2">Contact Details</h2>
                        <InputField label="Page Heading" value={contactData.heading} onChange={(val) => setContactData({ ...contactData, heading: val })} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <InputField label="Email Address" value={contactData.email} onChange={(val) => setContactData({ ...contactData, email: val })} />
                            <InputField label="Phone (Bhutan)" value={contactData.phoneBht} onChange={(val) => setContactData({ ...contactData, phoneBht: val })} />
                            <InputField label="Phone (Thailand)" value={contactData.phoneTh} onChange={(val) => setContactData({ ...contactData, phoneTh: val })} />
                        </div>

                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 mt-8 border-b pb-2">Social Links</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <InputField label="Instagram URL" value={contactData.instagram} onChange={(val) => setContactData({ ...contactData, instagram: val })} />
                            <InputField label="Facebook URL" value={contactData.facebook} onChange={(val) => setContactData({ ...contactData, facebook: val })} />
                            <InputField label="LinkedIn URL" value={contactData.linkedin} onChange={(val) => setContactData({ ...contactData, linkedin: val })} />
                        </div>

                        <div className="mt-8">
                            <ImageUploadField label="Contact Office Image" currentUrl={contactData.image_url} fileState={contactImageFile} setFileState={setContactImageFile} />
                        </div>

                        <div className="pt-6 border-t border-zinc-100 flex justify-end">
                            <button type="submit" disabled={loading} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2 font-bold uppercase tracking-wide text-sm disabled:opacity-50">
                                {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Contact Content
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
};

export default SiteContentAdmin;
