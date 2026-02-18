import React, { useState, useEffect } from "react";
import { XMarkIcon, LinkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const EditSocialModal = ({
  open,
  onClose,
  socialId,
  initialLinkedin = "",
  onSave,
}) => {
  const [linkedin, setLinkedin] = useState(initialLinkedin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLinkedin(initialLinkedin);
  }, [initialLinkedin]);

  if (!open) return null;

  const handleSave = async () => {
    if (!linkedin.trim() || !socialId) return;

    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:5000/api/socials/${socialId}`,
        { link: linkedin.trim() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onSave?.(response.data.link);
      onClose();
    } catch (error) {
      console.error("Error updating social:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-linear-to-br from-slate-900/60 via-indigo-500/20 to-purple-500/20 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-xl rounded-3xl -z-10" />

        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">

          <div className="p-8 pb-6 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black bg-linear-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                Edit LinkedIn
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="group relative p-2.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <XMarkIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="relative group">
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/yourusername"
                className="w-full pl-12 pr-5 py-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-3xl text-sm shadow-2xl focus:ring-4 focus:ring-indigo-500/30 transition-all duration-400 h-16"
              />
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/20 dark:border-slate-800/50 mt-4">
              <button
                onClick={onClose}
                className="flex-1 px-8 py-4 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-2xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={!linkedin.trim() || loading}
                className="flex-1 px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save LinkedIn"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSocialModal;