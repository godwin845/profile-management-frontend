import React, { useState } from "react";
import { 
  ExclamationTriangleIcon, 
  ArrowLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";

const DeleteAccountPage = ({
  onSubmit,
  onCancel,
}) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert("Please provide a reason for deletion");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://profile-management-backend-2jxo.onrender.com/api/account/delete", // Replace with your actual endpoint
        { reason: reason.trim() },
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`, // Uncomment if your API requires auth
          },
        }
      );

      console.log("Delete request submitted:", response.data);
      onSubmit?.(reason.trim());
    } catch (err) { 
      console.error("Deletion failed:", err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Settings", href: "#" },
    { label: "Account", href: "#" },
    { label: "Delete Account", href: "#" },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-linear-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900/50 dark:via-slate-800 dark:to-purple-900/20 backdrop-blur-sm">
      
      {/* Breadcrumb Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <nav className="flex items-center space-x-2 text-sm">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-slate-700 dark:text-slate-300 font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              title="Go back"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </a>
            
            <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && (
                    <ChevronRightIcon className="w-4 h-4 mx-1 text-slate-400" />
                  )}
                  <Link
                    to={item.href}
                    className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors font-medium hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-1000 slide-in-from-top-8">
          
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-linear-to-br from-rose-500/10 via-red-500/5 to-rose-500/10 blur-3xl -z-10 rounded-3xl" />
          
          {/* Main Container */}
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            
            {/* Warning Header */}
            <div className="p-10 pb-8 text-center border-b border-white/20 dark:border-slate-800/50">
              <div className="relative mx-auto w-24 h-24 mb-8 bg-linear-to-br from-rose-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl ring-8 ring-rose-500/30 hover:scale-110 transition-all duration-500">
                <ExclamationTriangleIcon className="w-12 h-12 text-white drop-shadow-2xl" />
              </div>
              <h1 className="text-4xl font-black bg-linear-to-r from-slate-900 via-rose-600 to-red-600 bg-clip-text text-transparent mb-4">
                Delete Account
              </h1>
              <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2 max-w-md mx-auto leading-relaxed">
                This action is permanent and irreversible
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Your account and all associated data will be permanently removed within 30 days
              </p>
            </div>

            {/* Form Content */}
            <div className="p-10">
              <div className="bg-linear-to-r from-rose-50/70 to-red-50/70 dark:from-rose-500/10 dark:to-red-500/10 backdrop-blur-sm border border-rose-200/50 dark:border-rose-800/50 rounded-3xl p-8 shadow-xl mb-8">
                
                {/* Feedback Request */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg mb-6">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Help us improve
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 max-w-xl mx-auto leading-relaxed">
                    Could you share why you're leaving?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your feedback helps us understand and serve you better
                  </p>
                </div>

                {/* Reason Textarea */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    Reason for leaving
                  </label>
                  <div className="relative group">
                    <textarea
                      value={reason}
                      onChange={(e) =>
                        e.target.value.length <= 500 &&
                        setReason(e.target.value)
                      }
                      placeholder="Tell us about your experience..."
                      className="w-full h-36 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-3xl text-sm resize-none shadow-2xl focus:shadow-3xl focus:ring-4 focus:ring-rose-500/30 focus:border-rose-500/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-400 hover:border-rose-400/50 hover:shadow-2xl pr-20 pt-12"
                      rows={5}
                    />
                    <div className="absolute top-6 left-6 text-slate-400 group-focus-within:text-rose-500 transition-colors">
                      💬
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-2xl backdrop-blur-sm shadow-lg border border-slate-200/60 dark:border-slate-700/60 font-mono">
                      {reason.length}/500
                    </div>
                    <div className="absolute inset-0 bg-linear-to-r from-rose-500/5 to-red-500/5 rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 text-sm text-red-600 dark:text-red-400 font-medium">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/20 dark:border-slate-800/50">
                <button
                  onClick={onCancel}
                  className="flex-1 group relative px-10 py-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-slate-700 dark:text-slate-300 font-bold rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
                >
                  <span>Cancel</span>
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-200/60 to-teal-200/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-sm" />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!reason.trim() || loading}
                  className="flex-1 group relative px-10 py-5 bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-rose-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span>
                    {loading ? "Submitting..." : "Submit Deletion Request"}
                  </span>
                  <div className="absolute inset-0 bg-white/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-400 backdrop-blur-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;