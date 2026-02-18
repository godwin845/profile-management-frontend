import React, { useState } from "react";
import { XMarkIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const CareerVisionModal = ({
  open,
  onClose,
  onUpdate,
}) => {
  const [form, setForm] = useState({
    category: "",
    longTerm: "",
    field: "",
    inspiration: "",
    shortTerm: "",
  });

  if (!open) return null;

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.category || !form.longTerm || !form.shortTerm) {
      alert("Please fill all required fields");
      return;
    }
    onUpdate?.(form);
    onClose();
  };

  const fields = [
    { key: "category", label: "Career Category *", placeholder: "e.g., Software Engineering, Data Science" },
    { key: "field", label: "Field of Interest", placeholder: "e.g., Frontend Development, Machine Learning" },
    { key: "longTerm", label: "Long-term Vision *", placeholder: "Where do you see yourself in 10 years?" },
    { key: "shortTerm", label: "Short-term Goals *", placeholder: "What do you want to achieve in next 2 years?" },
    { key: "inspiration", label: "Inspiration", placeholder: "Who inspires your career path?" },
  ];

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-linear-to-br from-emerald-500/20 via-slate-900/50 to-teal-500/20 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500 max-h-[95vh] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-indigo-500/5 to-teal-500/10 blur-xl" />
        
        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-4 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/50">
                  <ChartBarIcon className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-linear-to-r from-slate-900 to-emerald-900 dark:from-slate-100 dark:to-emerald-400 bg-clip-text text-transparent">
                    Career Vision
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Define your professional aspirations and roadmap
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="group relative p-2.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <XMarkIcon className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {fields.map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  {label}
                  {key === "category" || key === "longTerm" || key === "shortTerm" ? (
                    <span className="text-rose-500 text-xs">*</span>
                  ) : null}
                </label>
                <input
                  type="text"
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 hover:border-emerald-400/50 hover:shadow-xl"
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 p-8 pt-6 bg-linear-to-t from-white/50 dark:from-slate-900/50 to-transparent border-t border-white/20 dark:border-slate-800/50">
            <button
              onClick={onClose}
              className="flex-1 group relative px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-slate-700 dark:text-slate-300 font-bold rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-500/30"
            >
              <span>Cancel</span>
              <div className="absolute inset-0 bg-linear-to-r from-slate-200/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!form.category || !form.longTerm || !form.shortTerm}
              className="flex-1 group relative px-8 py-4 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span>Update Vision</span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerVisionModal;