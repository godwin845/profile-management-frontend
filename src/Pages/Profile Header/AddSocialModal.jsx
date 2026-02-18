import React, { useState } from "react";
import { XMarkIcon, LinkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const AddSocialModal = ({
  open,
  onClose,
  onAdd,
}) => {
  const [social, setSocial] = useState("Instagram");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!link.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "https://profile-management-backend-2jxo.onrender.com/api/socials",
        {
          social,
          link: link.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onAdd?.(response.data);
      setLink("");
      onClose();
    } catch (error) {
      console.error("Error adding social:", error);
    } finally {
      setLoading(false);
    }
  };

  const socialOptions = [
    { value: "Instagram", label: "Instagram", icon: "📸" },
    { value: "Twitter", label: "X (Twitter)", icon: "🐦" },
    { value: "LinkedIn", label: "LinkedIn", icon: "💼" },
    { value: "Facebook", label: "Facebook", icon: "📘" },
    { value: "GitHub", label: "GitHub", icon: "🐙" },
    { value: "YouTube", label: "YouTube", icon: "📺" },
    { value: "Discord", label: "Discord", icon: "💬" },
  ];

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-linear-to-br from-slate-900/60 via-indigo-500/20 to-purple-500/20 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-xl rounded-3xl -z-10" />

        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">

          <div className="p-8 pb-4 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/50">
                  <LinkIcon className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-linear-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                    Add Social Link
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Connect your social profiles
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group relative p-2.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <XMarkIcon className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="text-rose-500 text-xs">*</span>
                Social Platform
              </label>
              <div className="relative">
                <select
                  value={social}
                  onChange={(e) => setSocial(e.target.value)}
                  className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-xl appearance-none bg-no-repeat pr-12 cursor-pointer"
                >
                  {socialOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="text-rose-500 text-xs">*</span>
                Profile Link
              </label>
              <div className="relative group">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://instagram.com/yourusername"
                  className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-xl pr-12"
                />
                <LinkIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/20 dark:border-slate-800/50">
              <button
                onClick={onClose}
                className="flex-1 group relative px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-slate-700 dark:text-slate-300 font-bold rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-500/30"
              >
                <span>Cancel</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={!link.trim() || loading}
                className="flex-1 group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span>{loading ? "Adding..." : "Add Social Link"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSocialModal;