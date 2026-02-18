import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { useSelector } from "react-redux";

const ToggleButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="relative group">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 w-20 h-10 rounded-3xl bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      {/* Main Toggle Container */}
      <div 
        className="relative w-20 h-10 rounded-3xl p-1 cursor-pointer select-none
          bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl 
          border border-white/30 dark:border-slate-700/50 
          shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-0.5
          transition-all duration-500 group-hover:border-indigo-400/50"
        onClick={handleToggleTheme}
      >
        {/* Background Gradient */}
        <div className={`
          absolute inset-0 rounded-2xl shadow-lg transition-all duration-700 ease-out
          ${darkMode 
            ? "bg-linear-to-r from-slate-800/80 to-slate-900/80 blur-sm" 
            : "bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
          }
        `} />

        {/* Toggle Handler - Floating Orb */}
        <div className={`
          relative w-8 h-8 rounded-2xl flex items-center justify-center z-20 shadow-2xl
          transition-all duration-700 ease-out group-hover:shadow-3xl
          ${darkMode 
            ? "bg-linear-to-br from-slate-600 to-slate-700 translate-x-10 shadow-slate-900/50 hover:shadow-slate-800/70" 
            : "bg-linear-to-br from-white to-slate-100 shadow-white/80 hover:shadow-indigo-200/60"
          }
        `}>
          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Icon */}
          <div className={`
            w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500
            ${darkMode 
              ? "bg-linear-to-br from-yellow-400 to-orange-400 shadow-lg drop-shadow-lg" 
              : "bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg drop-shadow-lg"
            }
          `}>
            {darkMode ? (
              <svg className="w-3 h-3 text-black drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.706a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {/* Floating Particles */}
          {darkMode && (
            <>
              <div className="absolute w-1 h-1 bg-white/50 rounded-full -top-1 -right-1 animate-ping" />
              <div className="absolute w-0.5 h-0.5 bg-white/30 rounded-full -bottom-0.5 left-1 animate-pulse" />
            </>
          )}
        </div>

        {/* Magical Stars Effect (Light Mode) */}
        {!darkMode && (
          <>
            <div className="absolute w-2 h-2 bg-white/60 rounded-full star-1 left-2 top-2 animate-twinkle" />
            <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full star-2 left-4 top-1.5 animate-twinkle delay-200" />
            <div className="absolute w-1 h-1 bg-white/40 rounded-full star-3 right-1 bottom-1 animate-twinkle delay-400" />
          </>
        )}

        {/* Status Glow */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${darkMode 
            ? "bg-linear-to-r from-yellow-400/30 via-orange-400/30 to-yellow-400/30 blur-sm" 
            : "bg-linear-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-sm"
          }
        `} />
      </div>
    </div>
  );
};

export default ToggleButton;