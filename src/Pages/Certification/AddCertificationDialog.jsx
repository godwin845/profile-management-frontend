import { useState, useEffect } from "react";

const AddCertificateModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    certification: "",
    provider: "",
    url: "",
    certID: "",
    issuedDate: "",
    expDate: "",
    description: "",
  });

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        certification: "",
        provider: "", 
        url: "",
        certID: "",
        issuedDate: "",
        expDate: "",
        description: "",
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-linear-to-br from-black/60 via-slate-900/50 to-black/60 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500 lg:max-h-[95vh] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-indigo-500/5 to-pink-500/10 blur-xl" />
        
        <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-4 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-linear-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                    {isEditMode ? "Edit Certificate" : "Add Certification"}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {isEditMode ? "Update your certification details" : "Add a new certification to your profile"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group relative p-2 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 lg:p-8 space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-2 lg:grid-cols-0 md:grid-cols-2 gap-4">
              <InputField
                label="Certification Name *"
                name="certification"
                value={form.certification}
                onChange={handleChange}
                placeholder="e.g., React Developer Certification"
                required
              />
              <InputField
                label="Provider *"
                name="provider"
                value={form.provider}
                onChange={handleChange}
                placeholder="e.g., freeCodeCamp"
                required
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <InputField
                label="Certificate URL"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://certificate-url.com"
              />
              <InputField
                label="Certificate ID"
                name="certID"
                value={form.certID}
                onChange={handleChange}
                placeholder="e.g., ABC123XYZ"
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 lg:grid-cols-0 md:grid-cols-2 gap-4">
              <DateInput
                label="Issued Date"
                name="issuedDate"
                value={form.issuedDate}
                onChange={handleChange}
              />
              <DateInput
                label="Expiry Date"
                name="expDate"
                value={form.expDate}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <TextareaField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Briefly describe what you learned or achieved..."
              maxLength={200}
              charCount={200 - form.description.length}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/20 dark:border-slate-800/50">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 group relative px-6 py-3.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-semibold rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Cancel</span>
                <div className="absolute inset-0 bg-linear-to-r from-slate-200/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                type="submit"
                className="flex-1 group relative px-6 py-3.5 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              >
                <span>{isEditMode ? "Update Certificate" : "Add Certificate"}</span>
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
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
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
const DateInput = ({ label, name, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-lg focus:shadow-xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300 hover:border-indigo-400/50"
    />
  </div>
);

// Textarea Component
const TextareaField = ({ label, name, value, onChange, placeholder, maxLength, charCount }) => (
  <div className="space-y-3">
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        className="w-full px-4 py-3.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm resize-vertical shadow-lg focus:shadow-xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300 hover:border-indigo-400/50 pr-12"
      />
      <div className="absolute bottom-3 right-3 text-xs text-slate-400 dark:text-slate-500">
        {charCount}/{maxLength}
      </div>
    </div>
  </div>
);

export default AddCertificateModal;