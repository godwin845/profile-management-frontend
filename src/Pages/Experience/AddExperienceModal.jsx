import React, { useState } from "react";

const AddExperienceModal = ({
  open,
  onClose,
  onAdd,
  initialData,
}) => {
  const [form, setForm] = useState(
    initialData ?? {
      role: "",
      company: "",
      location: "",
      doj: "",
      doe: "",
      present: false,
    }
  );

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.role || !form.company || !form.doj) {
      alert("Please fill all required fields");
      return;
    }
    
    if (!form.present && !form.doe) {
      alert("Please provide end date or select currently working");
      return;
    }
    
    onAdd?.(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-slate-900/50 to-purple-500/20 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500 max-h-[95vh] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-xl" />
        
        <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-4 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/50">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-linear-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                    Add Experience
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Showcase your professional experience to stand out
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="group relative p-2.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Role & Company */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Job Role *"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g., Frontend Developer Intern"
                required
              />
              <InputField
                label="Company *"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g., TechCorp Inc."
                required
              />
            </div>

            {/* Location */}
            <div>
              <InputField
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Chennai, Tamil Nadu"
              />
            </div>

            {/* Dates */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DateInput
                  label="Start Date *"
                  name="doj"
                  value={form.doj}
                  onChange={handleChange}
                  required
                />
                <DateInput
                  label="End Date"
                  name="doe"
                  value={form.doe}
                  onChange={handleChange}
                  disabled={form.present}
                />
              </div>

              {/* Currently Working Toggle */}
              <div className="pt-4 border-t border-white/20 dark:border-slate-800/50">
                <label className="relative flex items-center gap-4 cursor-pointer group p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="present"
                      checked={form.present}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300/50 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-lg" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Currently working here</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/20 dark:border-slate-800/50">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 group relative px-8 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-semibold rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Cancel</span>
                <div className="absolute inset-0 bg-linear-to-r from-slate-200/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                type="submit"
                className="flex-1 group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                <span>Add Experience</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, name, value, onChange, placeholder, required }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
      {label}
      {required && <span className="text-rose-500 text-xs">*</span>}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm placeholder-slate-400 dark:placeholder-slate-500 shadow-lg focus:shadow-xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300 hover:border-indigo-400/50"
    />
  </div>
);

// Date Input Component
const DateInput = ({ label, name, value, onChange, required, disabled }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
      {label}
      {required && <span className="text-rose-500 text-xs">*</span>}
    </label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`w-full px-4 py-3.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-lg focus:shadow-xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300 hover:border-indigo-400/50 ${
        disabled ? 'opacity-60 cursor-not-allowed bg-slate-100/50 dark:bg-slate-700/50' : ''
      }`}
    />
  </div>
);

export default AddExperienceModal;