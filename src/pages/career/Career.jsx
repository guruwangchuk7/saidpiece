import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import SEO from '../../components/common/SEO';
import { supabase } from '../../services/supabaseClient';
import toast from 'react-hot-toast';

const BackButton = () => (
  <NavLink
    to="/"
    className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20 text-zinc-600 hover:text-zinc-900"
  >
    <img src={rightArrow} alt="Back" className="w-4 h-4 rotate-180" loading="eager" />
    <span>Back to home</span>
  </NavLink>
);

const HeroSection = () => {
  const categories = ["Design", "Site", "BIM", "Cost", "MEP", "Visuals", "Construction", "Property", "Business"];
  
  return (
    <div className="pt-24 pb-12 lg:pt-32 lg:pb-16 max-w-5xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight uppercase text-zinc-900 mb-6">
          Campus Recruitment '26
        </h1>
        <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed mx-auto max-w-2xl mb-8">
          Don't wait years to work on real projects. Design, build, learn, and lead early with a young Bhutanese design-build team.
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {categories.map((cat, i) => (
            <motion.span 
              key={cat} 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.05 * i }}
              className="px-4 py-1.5 border border-zinc-200 text-zinc-600 rounded-full text-xs font-medium uppercase tracking-wider bg-zinc-50"
            >
              {cat}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const CompanyOverview = () => {
  return (
    <div className="py-12 border-t border-zinc-100 mb-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="md:pt-8">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6">The Opportunity</h3>
          <p className="text-zinc-600 leading-relaxed mb-6">
            We're a startup working across architecture, engineering, construction, and property. We're looking for graduates who want more than a desk job.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            At Saidpiece, juniors work on real projects early, guided by senior architects and engineers. You don't need to know everything from day one, but you must be curious and ready to grow.
          </p>
        </div>
        <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6">Why Join Us?</h3>
          <ul className="space-y-4">
            {[
              "Work on live projects and learn fast",
              "Build your portfolio and visit sites",
              "Understand how design becomes construction",
              "Explore business, marketing, or property",
              "Grow with a young startup team"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-700">
                <svg className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '', contact_number: '', email: '', position_interest: '', degree_program: '',
    graduation_status: '', travel_preference: '', availability: '', interest_areas: [],
    career_description: '', saidpiece_path: '', exciting_project: '', internship_experience: '',
    technical_confidence: '', cv_file: null, cv_link: '', portfolio_file: null, portfolio_link: '',
    field_motivation: '', exciting_work_type: '', skills_to_learn: [], three_year_goal: '',
    top_job_priorities: [], responsibility_level: '', startup_environment: '', work_style: '',
    problem_solving_style: '', preferred_environment: '', feedback_style: '', learning_style: '',
    proud_project: '', challenge_response: '', join_reason: '', questions: '', consent: false,
    other_degree_program: ''
  });

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleFileChange = (field, e) => {
    if (e.target.files && e.target.files[0]) {
      updateForm(field, e.target.files[0]);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.full_name || !formData.contact_number || !formData.email || !formData.position_interest || !formData.degree_program || !formData.graduation_status || !formData.travel_preference || !formData.availability) {
        toast.error('Please complete all required fields.');
        return false;
      }
      if (formData.degree_program === 'Other' && !formData.other_degree_program.trim()) {
        toast.error('Please specify your degree program.');
        return false;
      }
    }
    if (step === 7 && !formData.consent) {
      toast.error('You must agree to the terms to submit.');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      window.scrollTo({ top: document.getElementById('form-container')?.offsetTop - 100, behavior: 'auto' });
      setStep(s => Math.min(s + 1, 7));
    }
  };
  const prevStep = () => {
    window.scrollTo({ top: document.getElementById('form-container')?.offsetTop - 100, behavior: 'auto' });
    setStep(s => Math.max(s - 1, 1));
  };

  const uploadFile = async (file, bucket) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `career_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
  };

  const submitApplication = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      let cv_file_url = null;
      let portfolio_file_url = null;

      if (formData.cv_file) {
        cv_file_url = await uploadFile(formData.cv_file, 'blog-images');
      }
      if (formData.portfolio_file) {
        portfolio_file_url = await uploadFile(formData.portfolio_file, 'blog-images');
      }

      const submissionData = {
        ...formData,
        degree_program: formData.degree_program === 'Other' ? formData.other_degree_program : formData.degree_program,
        cv_file_url,
        portfolio_file_url
      };
      
      delete submissionData.cv_file;
      delete submissionData.portfolio_file;
      delete submissionData.other_degree_program;

      const { error } = await supabase.from('career_applications').insert([submissionData]);
      if (error) throw error;
      
      setStep(8); // Success step
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Modern UI Components for Forms
  const InputField = ({ label, type = 'text', field, required = true, placeholder = '' }) => (
    <div className="mb-5">
      <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">{label}{required && ' *'}</label>
      <input 
        type={type} 
        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl p-3 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all" 
        value={formData[field]} 
        onChange={e => updateForm(field, e.target.value)} 
        placeholder={placeholder}
      />
    </div>
  );

  const SelectionCards = ({ label, field, options, multi = false, required = true }) => {
    return (
      <div className="mb-6 border-b border-zinc-100 pb-6 last:border-b-0 last:pb-0">
        <label className="block text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">{label}{required && ' *'}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map(opt => {
            const isSelected = multi ? formData[field].includes(opt) : formData[field] === opt;
            return (
              <label 
                key={opt} 
                className={`relative flex items-center px-4 py-3 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                  isSelected ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50/50 bg-white'
                }`}
              >
                <div className={`flex items-center justify-center w-5 h-5 mr-3 shrink-0 rounded transition-colors ${
                  multi ? 'border' : 'border-2 rounded-full'
                } ${
                  isSelected ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300'
                }`}>
                  {isSelected && multi && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  {isSelected && !multi && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className={`text-sm leading-snug ${isSelected ? 'font-medium text-zinc-900' : 'text-zinc-600'}`}>{opt}</span>
                <input 
                  type={multi ? 'checkbox' : 'radio'} 
                  className="hidden" 
                  checked={isSelected} 
                  onChange={() => multi ? handleMultiSelect(field, opt) : updateForm(field, opt)} 
                />
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const TextArea = ({ label, field, placeholder }) => (
    <div className="mb-8">
      <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">{label}</label>
      <textarea
        rows={4}
        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm rounded-xl p-4 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all resize-none"
        placeholder={placeholder}
        value={formData[field]}
        onChange={(e) => updateForm(field, e.target.value)}
      />
    </div>
  );

  const FileUploadCard = ({ label, fileField, linkField }) => (
    <div className="mb-8 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
      <h4 className="text-sm font-bold text-zinc-900 mb-4">{label}</h4>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Upload File</label>
          <input 
            type="file" 
            onChange={e => handleFileChange(fileField, e)} 
            className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 transition-colors cursor-pointer" 
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-px bg-zinc-200 flex-1"></div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">OR</span>
          <div className="h-px bg-zinc-200 flex-1"></div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Provide Link</label>
          <input 
            type="url" 
            placeholder="https://..." 
            className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-zinc-900 outline-none transition-all" 
            value={formData[linkField]} 
            onChange={e => updateForm(linkField, e.target.value)} 
          />
        </div>
      </div>
    </div>
  );

  if (step === 8) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight text-zinc-900">Application Sent</h2>
        <p className="text-zinc-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Thank you for your interest in Saidpiece. We've received your application and will review it shortly.
        </p>
        <NavLink to="/" className="inline-block bg-zinc-900 text-white px-8 py-3.5 rounded-full hover:bg-zinc-800 font-bold uppercase tracking-widest text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0">
          Back to Home
        </NavLink>
      </div>
    );
  }

  const sectionTitles = [
    "Personal Info", "Explore Your Interest", "What Have You Tried So Far?",
    "What Gets You Excited?", "How You Work Best", "Show Us Your Story", "Final Review"
  ];

  return (
    <div id="form-container" className="py-8 relative max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
            {sectionTitles[step - 1]}
          </h2>
          <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest shrink-0">Step {step} / 7</span>
        </div>
        <div className="flex gap-1.5 h-2">
          {[1,2,3,4,5,6,7].map(s => (
            <div key={s} className={`h-full flex-1 rounded-full transition-colors duration-300 ${s === step ? 'bg-zinc-900' : s < step ? 'bg-zinc-400' : 'bg-zinc-100'}`} />
          ))}
        </div>
      </div>

      <div className="bg-white">
          {step === 1 && (
            <div className="space-y-0">
              <div className="border-b border-zinc-100 pb-6 mb-6">
                <InputField label="Full Name" field="full_name" placeholder="Enter your full name" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InputField label="Contact Number" type="tel" field="contact_number" placeholder="Phone number" />
                  <InputField label="Email Address" type="email" field="email" placeholder="example@gmail.com" />
                </div>
              </div>
              <SelectionCards label="Which Position Are You Most Interested In?" field="position_interest" options={["Junior Architect", "Junior Civil Engineer", "Junior Electrical / MEP Engineer", "Open to any suitable role"]} />
              <SelectionCards label="Degree Program" field="degree_program" options={["B.Arch", "B.E. Civil", "B.E. Electrical", "Other"]} />
              <AnimatePresence>
                {formData.degree_program === 'Other' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <InputField label="Please specify your degree program" field="other_degree_program" placeholder="e.g. B.Sc Computer Science" />
                  </motion.div>
                )}
              </AnimatePresence>
              <SelectionCards label="Expected Graduation Status" field="graduation_status" options={["Already graduated", "Final semester", "Awaiting results"]} />
              <SelectionCards label="Are you open to site work or travel?" field="travel_preference" options={["Yes, anywhere", "Within my region only", "Prefer office-based", "Need to discuss"]} />
              <SelectionCards label="When are you available to join?" field="availability" options={["Immediately", "Within 1 month", "Within 2–3 months", "Need to discuss"]} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <SelectionCards label="Select all that apply:" field="interest_areas" multi={true} options={["Architecture and concept design", "Working drawings and BIM", "3D visuals, rendering and presentation", "Site supervision and construction coordination", "BOQ, costing and estimation", "Electrical / MEP coordination", "Project management", "Business development and client communication", "Marketing, social media and content creation", "Property development and real estate-related work", "I'm not sure yet, but I'm open to exploring"]} />
              <SelectionCards label="Which describes you best?" field="career_description" options={["I want to become very strong in one technical field", "I want to be technical, but also explore creative/business work", "I'm interested in site, construction and project delivery", "I'm interested in visuals, presentation and storytelling", "I'm still figuring out my path"]} />
              <SelectionCards label="Which Saidpiece path sounds most like you?" field="saidpiece_path" options={["The Designer", "The Builder", "The Detailer", "The Problem Solver", "The Systems Thinker", "The Storyteller", "Still exploring"]} />
              <SelectionCards label="What kind of first project would excite you most?" field="exciting_project" options={["A house", "A café / interior", "A school / public building", "A hotel / resort", "A site supervision role", "A BIM / drawing package", "A property / development project", "Anything real, I just want to learn"]} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <SelectionCards label="Internship or site experience" field="internship_experience" options={["Yes, 6+ months", "Yes, under 6 months", "Academic projects only", "None yet"]} />
              <SelectionCards label="Rate your confidence in your core technical area" field="technical_confidence" options={["Very confident", "Confident", "Developing", "Still learning"]} />
              <FileUploadCard label="Curriculum Vitae (CV)" fileField="cv_file" linkField="cv_link" />
              <FileUploadCard label="Design Portfolio" fileField="portfolio_file" linkField="portfolio_link" />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-2">
              <SelectionCards label="What draws you to this field?" field="field_motivation" options={["Creative design", "Problem-solving on site", "Seeing projects built", "Technical systems", "Career stability", "Business and project development"]} />
              <SelectionCards label="Which type of work excites you most?" field="exciting_work_type" options={["Design & concept", "Site management & execution", "Cost & quantity", "Systems & MEP", "Visuals & presentation", "Business development / marketing", "A mix"]} />
              <SelectionCards label="What do you want to become really good at in the next 12 months?" field="skills_to_learn" multi={true} options={["Technical detailing", "Software & tools", "Site execution", "Client communication", "Design concepts"]} />
              <SelectionCards label="Where do you see yourself in 3 years?" field="three_year_goal" options={["Specialist in my field", "Team lead", "Working across multiple project types", "Running projects independently", "Pursuing further study", "Not sure yet"]} />
              <SelectionCards label="Top 2 things that matter in your first job" field="top_job_priorities" multi={true} options={["Mentorship & learning", "Salary", "Project variety", "Work-life balance", "Career growth", "Real project responsibility"]} />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-2">
              <SelectionCards label="Responsibility Level" field="responsibility_level" options={["I want clear instructions", "I want guidance but room to explore", "I want to figure things out independently"]} />
              <SelectionCards label="Startup Environment" field="startup_environment" options={["I thrive in fast-paced changing environments", "I prefer structured routines", "I'm adaptable"]} />
              <SelectionCards label="Work Style" field="work_style" options={["I work best alone", "I work best in a highly collaborative team", "I like a mix of both"]} />
              <SelectionCards label="Problem Solving" field="problem_solving_style" options={["I research and try to solve it first", "I immediately ask for help", "I discuss with peers"]} />
              <SelectionCards label="Preferred Environment" field="preferred_environment" options={["Office desk", "On site", "Mix of both"]} />
              <SelectionCards label="Feedback Style" field="feedback_style" options={["I prefer direct critical feedback", "I prefer gentle constructive feedback", "I appreciate regular check-ins"]} />
              <SelectionCards label="Learning Style" field="learning_style" options={["Learning by doing/making mistakes", "Learning by watching others", "Learning by reading/studying"]} />
            </div>
          )}

          {step === 6 && (
            <div className="space-y-2">
              <TextArea label="Tell us about one project you are proud of" field="proud_project" placeholder="It can be academic or personal. What made it special?" />
              <TextArea label="Mini Challenge Response" field="challenge_response" placeholder="Describe how you handled a difficult situation or technical challenge..." />
              <TextArea label="Why do you want to join Saidpiece Architects?" field="join_reason" placeholder="What aligned with you?" />
              <TextArea label="Any questions for Saidpiece Architects?" field="questions" placeholder="What would you like to know from us?" />
            </div>
          )}

          {step === 7 && (
            <div className="space-y-2 pb-8">
              <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200 text-center">
                <h4 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wider">Ready to submit?</h4>
                <p className="text-zinc-600 mb-8 max-w-md mx-auto">Please ensure all your information, including your CV and Portfolio links, are correct before submitting.</p>
                
                <label className="flex items-start justify-center gap-4 cursor-pointer max-w-lg mx-auto text-left group">
                  <div className={`mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded border-2 transition-colors ${formData.consent ? 'bg-zinc-900 border-zinc-900' : 'bg-white border-zinc-300 group-hover:border-zinc-500'}`}>
                    {formData.consent && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div className="text-zinc-700 text-sm leading-relaxed">
                    <input type="checkbox" className="hidden" checked={formData.consent} onChange={e => updateForm('consent', e.target.checked)} />
                    I agree that Saidpiece Architects may store and use the information I've shared for recruitment purposes.
                  </div>
                </label>
              </div>
            </div>
          )}
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-100 flex items-center justify-between sticky bottom-0 bg-white/90 backdrop-blur pb-6 z-20">
        {step > 1 ? (
          <button onClick={prevStep} disabled={loading} className="px-6 py-3 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-50">
            Back
          </button>
        ) : <div />}
        
        {step < 7 ? (
          <button onClick={nextStep} className="px-8 py-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 font-bold uppercase tracking-widest text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3">
            Continue <img src={rightArrow} alt="Next" className="w-4 h-4 invert" />
          </button>
        ) : (
          <button onClick={submitApplication} disabled={loading || !formData.consent} className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 font-bold uppercase tracking-widest text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0">
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </div>
  );
};

function Career() {
  return (
    <div className="relative flex flex-col bg-white px-4 sm:px-6 lg:px-10 min-h-screen">
      <SEO 
        title="Career" 
        description="Join Saidpiece Architects. Real projects. Real responsibility. Real mentorship. Design, build, learn, and lead early." 
        canonical="/career" 
      />
      <BackButton />
      
      <div className="mx-auto w-full pt-4">
        <HeroSection />
        <CompanyOverview />
        <ApplicationForm />
      </div>
    </div>
  );
}

export default Career;
