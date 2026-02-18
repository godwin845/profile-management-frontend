
const DeleteCertificationDialog = ({ 
  open, 
  certificationName, 
  onCancel, 
  onDelete 
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 animate-in slide-in-from-bottom-2 fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-linear-to-br from-slate-900/60 via-purple-500/20 to-slate-900/60 backdrop-blur-sm transition-all duration-300"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-auto">
        {/* Decorative Ring */}
        <div className="absolute -inset-2 bg-linear-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-75" />
        
        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-6 text-center border-b border-white/20 dark:border-slate-800/50">
            <div className="relative mx-auto w-20 h-20 mb-6 bg-linear-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-purple-500/30 hover:scale-110 transition-all duration-500">
              <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black bg-linear-to-r from-slate-900 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Delete Certification
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              This will permanently remove your certification from your profile.
            </p>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            <div className="bg-linear-to-r from-purple-50/60 to-indigo-50/60 dark:from-purple-500/10 dark:to-indigo-500/10 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-50">
                  "{certificationName}"
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                This action cannot be undone
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your certification will be permanently deleted from your profile
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 px-8 pb-8 bg-linear-to-t from-white/50 dark:from-slate-900/50 to-transparent">
            <button
              onClick={onCancel}
              className="flex-1 group relative px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-bold rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
            >
              <span>Cancel</span>
              <div className="absolute inset-0 bg-linear-to-r from-emerald-200/50 to-teal-200/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>
            <button
              onClick={onDelete}
              className="flex-1 group relative px-8 py-4 bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
              <span>Delete Certification</span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCertificationDialog;