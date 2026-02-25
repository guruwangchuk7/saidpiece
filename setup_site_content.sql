-- Drop existing if needed
-- drop table if exists public.site_content;

-- Create the site_content table
create table if not exists public.site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.site_content enable row level security;

-- Create policies (drop first to avoid errors if rerunning)
drop policy if exists "Public can view site content." on public.site_content;
drop policy if exists "Admins can insert site content." on public.site_content;
drop policy if exists "Admins can update site content." on public.site_content;
drop policy if exists "Admins can delete site content." on public.site_content;

-- Allow public read access
create policy "Public can view site content."
  on public.site_content for select
  using ( true );

-- Restrict insert/update/delete to admins only
create policy "Admins can insert site content."
  on public.site_content for insert
  with check ( (select role from public.admins where email = auth.jwt() ->> 'email') in ('admin', 'super_admin') );

create policy "Admins can update site content."
  on public.site_content for update
  using ( (select role from public.admins where email = auth.jwt() ->> 'email') in ('admin', 'super_admin') );

create policy "Admins can delete site content."
  on public.site_content for delete
  using ( (select role from public.admins where email = auth.jwt() ->> 'email') in ('admin', 'super_admin') );

-- Seed initial data across all pages
insert into public.site_content (id, content) values 
('home_hero', '{"titlePart1": "said", "titlePart2": "piece", "titlePart3": "architects", "image_url": ""}'),

('home_about', '{"heading": "STUDIO OF ARCHITECTURE AND ENGINEERING", "about": "Saidpiece Architects has completed projects across Bhutan and abroad, specializing in architectural design, urban planning, interior design, engineering, and construction consultancy. Guided by the principles of Gross National Happiness, we merge sustainability, creativity, and precision to deliver innovative, culturally authentic design solutions.", "publication": "Our work aspires to contribute to leading global and regional design platforms and journals, sharing Bhutan’s unique architectural vision with the world.", "image_url": ""}'),

('nav', '{"titlePart1": "said", "titlePart2": "piece", "tagline": "STORE | ART FOUNDATION"}'),

('about_page', '{"heroHeading": "saidpiece architects", "heroImage_url": "", "introTitle": "Saidpiece Architects is a registered\nBhutanese firm specializing in\narchitectural and engineering solutions.", "introDescription": "Located at Namgyal Plaza, Thimphu (CDB No. 312; Trade License No. 1052642), we provide full-spectrum professional services encompassing design, documentation, and project delivery, from concept to completion. Founded in 2023, Saidpiece was born from a vision to merge Bhutanese tradition with modern innovation. Our work is rooted in the belief that architecture is not merely the creation of buildings, but the crafting of environments that foster balance between human experience, culture, and nature.", "introImage_url": "", "expertiseHeading": "Our Expertise", "expertiseTagline": "Full-spectrum professional services from concept to completion.", "visionQuote": "Saidpiece Architects is a Bhutan-based multi-disciplinary and construction firm specializing in innovative sustainable designs.", "visionDescription": "Offering full turn key services from concept development to project completion, we focus on creating functional, aesthetic and mindful spaces with an emphasis on innovation and sustainability.", "visionImage_url": ""}'),

('contact_page', '{"heading": "LET''S TALK?", "email": "thinley@saidpiece.com", "phoneBht": "+975 17899794 (BHT)", "phoneTh": "+66 931205085 (TH)", "instagram": "https://www.instagram.com/saidpiece_architects", "facebook": "https://www.facebook.com/saidpiece.architects", "linkedin": "https://www.linkedin.com/company/saidpiece/", "image_url": ""}')
on conflict (id) do nothing;
