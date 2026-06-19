-- Schema for Career Applications

CREATE TABLE public.career_applications (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    
    -- Section 1: Start Here
    full_name text NOT NULL,
    contact_number text NOT NULL,
    email text NOT NULL,
    position_interest text,
    degree_program text,
    graduation_status text,
    travel_preference text,
    availability text,

    -- Section 3: Explore Your Interest
    interest_areas jsonb DEFAULT '[]'::jsonb,
    career_description text,
    saidpiece_path text,
    exciting_project text,

    -- Section 4: What Have You Tried So Far?
    internship_experience text,
    technical_confidence text,
    cv_file_url text,
    cv_link text,
    portfolio_file_url text,
    portfolio_link text,

    -- Section 5: What Gets You Excited?
    field_motivation text,
    exciting_work_type text,
    skills_to_learn jsonb DEFAULT '[]'::jsonb,
    three_year_goal text,
    top_job_priorities jsonb DEFAULT '[]'::jsonb,

    -- Section 6: How You Work Best (Assuming exact mapping from UI)
    responsibility_level text,
    startup_environment text,
    work_style text,
    problem_solving_style text,
    preferred_environment text,
    feedback_style text,
    learning_style text,

    -- Section 7: Show Us Your Story
    proud_project text,
    challenge_response text,
    join_reason text,
    questions text,
    
    -- Consent
    consent boolean DEFAULT false,

    CONSTRAINT career_applications_pkey PRIMARY KEY (id)
);
