import React from "react";

const CareerVisionCard = ({
  title,
  shortTerm,
  field,
  inspiration,
  category,
}) => {
  return (
    <div className="group relative bg-linear-to-br from-indigo-50/70 via-white to-purple-50/50 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-2xl hover:shadow-3xl p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Decorative Corner Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-linear-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl blur-xl -rotate-12 opacity-75"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-linear-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-2xl"></div>

      {/* Header Section */}
      <div className="relative flex justify-between items-start mb-6">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 bg-linear-to-r from-slate-400 to-slate-500 bg-clip-text">
            Your Career Vision
          </p>
          <h2 className="text-2xl lg:text-3xl font-black bg-linear-to-r from-gray-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent drop-shadow-lg leading-tight group-hover:scale-[1.02] transition-transform duration-300">
            {title}
          </h2>
          {category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-3 bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 text-xs font-semibold rounded-2xl border border-emerald-200/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              {category}
            </span>
          )}
        </div>

        {/* Sparkle Icon with Animation */}
        <div className="relative w-16 h-16 flex items-center justify-center ml-4 shrink-0 group-hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl blur-xl opacity-60 group-hover:opacity-80"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-yellow-400/30 to-orange-400/30 backdrop-blur-sm rounded-3xl border-2 border-white/50 shadow-2xl flex items-center justify-center hover:rotate-12 transition-all duration-700">
            <span className="text-2xl group-hover:animate-sparkle">✨</span>
          </div>
        </div>
      </div>

      {/* Modern Divider */}
      <div className="relative mb-8">
        <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute inset-0 h-px bg-linear-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/40 blur opacity-75"></div>
      </div>

      {/* Enhanced Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Short Term Goal */}
        <div className="group/card relative p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-indigo-300/50 hover:shadow-xl transition-all duration-400 hover:-translate-y-1">
          <div className="absolute -inset-1 bg-linear-to-r from-indigo-500/20 rounded-2xl -z-10 opacity-0 group-hover/card:opacity-100 transition-all duration-500 blur-sm"></div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            What you're growing into right now
          </p>
          <p className="text-lg font-bold text-slate-900 group-hover/card:text-indigo-700 transition-colors">
            {shortTerm}
          </p>
          <div className="absolute bottom-2 right-3 w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover/card:opacity-100 flex items-center justify-center shadow-lg transition-all duration-500 -rotate-12">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Field of Interest */}
        <div className="group/card relative p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-purple-300/50 hover:shadow-xl transition-all duration-400 hover:-translate-y-1">
          <div className="absolute -inset-1 bg-linear-to-r from-purple-500/20 rounded-2xl -z-10 opacity-0 group-hover/card:opacity-100 transition-all duration-500 blur-sm"></div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            The space you want to grow in
          </p>
          <p className="text-lg font-bold text-slate-900 group-hover/card:text-purple-700 transition-colors">
            {field}
          </p>
          <div className="absolute bottom-2 right-3 w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl opacity-0 group-hover/card:opacity-100 flex items-center justify-center shadow-lg transition-all duration-500 -rotate-12">
            <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Inspiration */}
        <div className="group/card relative p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-pink-300/50 hover:shadow-xl transition-all duration-400 hover:-translate-y-1">
          <div className="absolute -inset-1 bg-linear-to-r from-pink-500/20 rounded-2xl -z-10 opacity-0 group-hover/card:opacity-100 transition-all duration-500 blur-sm"></div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Inspired by
          </p>
          <p className="text-lg font-bold text-slate-900 group-hover/card:text-pink-700 transition-colors truncate">
            {inspiration}
          </p>
          <div className="absolute bottom-2 right-3 w-12 h-12 bg-linear-to-br from-pink-500 to-orange-600 rounded-2xl opacity-0 group-hover/card:opacity-100 flex items-center justify-center shadow-lg transition-all duration-500 -rotate-12">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Custom Sparkle Animation */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.7; }
        }
        .animate-sparkle {
          animation: sparkle 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default CareerVisionCard;