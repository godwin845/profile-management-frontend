import React, { useState } from "react";
import { XMarkIcon, SparklesIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const predefinedSkills = [
  "React", "JavaScript", "TypeScript", "Node.js", "Express.js",
  "MongoDB", "MySQL", "Spring Boot", "Java", "Redux", "Tailwind CSS",
  "Bootstrap", "HTML", "CSS", "Git", "Docker", "AWS", "Python",
  "Django", "Flutter",
];

const SkillsModal = ({ open, onClose, onSave }) => {
  const [skills, setSkills] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setValue("");
  };

  const handleSave = async () => {
    if (skills.length === 0) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // 🔥 Axios POST request to save skills
      await axios.post(
        "http://localhost:5000/api/profile/skills",
        { skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optional callback to parent
      onSave?.(skills);

      onClose();
    } catch (err) {
      console.error("Error saving skills:", err);
      alert("Failed to save skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSuggestions = predefinedSkills.filter(
    (skill) => skill.toLowerCase().includes(value.toLowerCase()) && !skills.includes(skill)
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-linear-to-br from-slate-900/60 via-indigo-500/20 to-purple-500/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500 max-h-[95vh] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-xl" />
        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-4 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/50">
                  <SparklesIcon className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-linear-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                    Manage Skills
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Add skills to showcase your expertise
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

          {/* Skills Input */}
          <div className="p-8 space-y-6">
            <div className="relative">
              <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group/input">
                <div className="flex flex-wrap gap-2 mb-3 max-h-24 overflow-y-auto pb-2">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="group/skill bg-linear-to-r from-indigo-100/80 to-purple-100/80 dark:from-indigo-500/20 dark:to-purple-500/20 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 rounded-2xl px-4 py-2 flex items-center shadow-lg hover:shadow-xl hover:scale-[1.05] hover:-translate-y-0.5 transition-all duration-300 hover:from-indigo-200/90 hover:to-purple-200/90"
                    >
                      <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 truncate max-w-30 mr-2">
                        {skill}
                      </span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="group-hover/skill:opacity-100 opacity-70 hover:opacity-100 p-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:shadow-rose-200/50 transition-all duration-200 hover:scale-110"
                      >
                        <XMarkIcon className="w-4 h-4 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && value.trim()) {
                      e.preventDefault();
                      addSkill(value);
                    }
                  }}
                  placeholder="Type a skill and press Enter (or pick from suggestions)..."
                  className="w-full outline-none text-sm bg-transparent text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 pt-1 border-none focus:ring-0"
                />
              </div>

              {/* Suggestions */}
              {value && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-3xl shadow-2xl hover:shadow-3xl animate-in slide-in-from-top-2 duration-200 max-h-60 overflow-hidden">
                  {filteredSuggestions.slice(0, 8).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="w-full px-6 py-3.5 text-left hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-slate-800/50 dark:hover:to-slate-700/50 transition-all duration-300"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            {skills.length > 0 && (
              <div className="text-center py-4 px-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{skills.length}</span> skill{skills.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/20 dark:border-slate-800/50">
              <button
                onClick={onClose}
                className="flex-1 px-8 py-4 bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={skills.length === 0 || loading}
                className="flex-1 px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : `Save Skills (${skills.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;