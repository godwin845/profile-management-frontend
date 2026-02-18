import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import ToggleButton from "./ToggleButton";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  const dispatch = useDispatch();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const closeMobileMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // Profile dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile menu outside click
  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const closeProfile = () => setProfileOpen(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeProfile();
    window.location.href = "/";
  };

  return (
    <div
      className={`
      ${
        darkMode
          ? "bg-linear-to-r from-slate-900 via-gray-900 to-slate-900 shadow-2xl border-b border-slate-800/50 backdrop-blur-xl"
          : "bg-linear-to-r from-white via-slate-50/50 to-white shadow-2xl border-b border-slate-200/60 backdrop-blur-xl"
      }
      sticky top-0 z-50 w-full transition-all duration-500
    `}
    >
      <div className="h-20 max-w-screen-2xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            className={`
              ${
                darkMode
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              } 
              md:hidden group relative p-2 rounded-2xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-110
            `}
            onClick={() => {
              if (mobileOpen) {
                closeMobileMenu();
              } else {
                setMobileOpen(true);
              }
            }}
          >
            <div className="relative">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          </button>

          <a
            href="#"
            className="group relative h-12 w-36 lg:w-40 flex items-center overflow-hidden"
          >
            <span className="font-bold text-xl text-violet-400">
              Profile Management
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 lg:gap-2 ml-4">
            {[
              { to: "#", label: "Jobs" },
              { to: "#", label: "Hackathons" },
              { to: "#", label: "Projects" },
              { to: "#", label: "Tasks" },
              { to: "#", label: "Organization" },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                label={item.label}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          <ToggleButton />

          {isAuthenticated ? (
            <div ref={profileRef} className="relative">
              <div
                className="flex items-center gap-3 p-3 rounded-3xl cursor-pointer select-none
                bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 
                shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 
                transition-all duration-500 group/profile"
                onClick={toggleProfile}
              >
                <div className="w-12 h-12 rounded-3xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500
                  flex items-center justify-center text-white font-bold text-lg shadow-2xl ring-2 ring-white/50">
                  {user?.firstName?.charAt(0).toUpperCase() || "G"}
                </div>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-500 ${
                    profileOpen ? "rotate-180" : ""
                  } ${darkMode ? "text-white/90" : "text-slate-600"}`}
                />
              </div>

              {profileOpen && (
                <div
                  className={`
                  absolute right-0 top-20 w-72
                  ${
                    darkMode
                      ? "bg-slate-900/95 border border-slate-800/60"
                      : "bg-white/95 border border-slate-200/60"
                  }
                  rounded-3xl z-9999 overflow-hidden shadow-2xl
                `}
                >
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white font-bold text-xl">
                        {user?.firstName?.charAt(0).toUpperCase() || "G"}
                      </div>
                      <div>
                        <h4 className="font-black text-xl truncate">
                          {user
                            ? `${user.firstName} ${user.lastName}`
                            : "Guest"}
                        </h4>
                        <p className="text-sm truncate">
                          {user?.email || "Not Logged In"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <GradientDropdownLink
                    to="/profile"
                    onClick={closeProfile}
                    icon={<User className="w-6 h-6" />}
                    label="Profile"
                  />

                  <GradientDropdownLink
                    to="/"
                    onClick={handleLogout}
                    icon={<LogOut className="w-6 h-6" />}
                    label="Logout"
                    danger
                  />
                </div>
              )}
            </div>
          ) : (
            <Link
              to='/'
              className="px-3 py-3 lg:px-6 lg:py-3 hover:scale-[1.02] hover:-translate-y-0.5 rounded-2xl font-semibold bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {(mobileOpen || isClosing) &&
        createPortal(
          <div className="fixed inset-0 z-100 md:hidden">
            {/* Overlay */}
            <div
              className={`absolute inset-0 top-20 transition-opacity duration-300 ${
                mobileOpen && !isClosing ? "opacity-100" : "opacity-0"
              } ${darkMode ? "bg-black/60" : "bg-slate-900/40"} backdrop-blur-sm`}
              onClick={closeMobileMenu}
            />

            {/* Sidebar */}
            <div
              ref={mobileMenuRef}
              className={`absolute left-0 top-20 bottom-0 w-72 max-w-[85vw]
                transform transition-all duration-300 ease-in-out
                ${
                  mobileOpen && !isClosing
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                }
                ${
                  darkMode
                    ? "bg-slate-900 border-r border-slate-800/60"
                    : "bg-white border-r border-slate-200/60"
                }
                shadow-2xl overflow-y-auto`}
            >
              <nav className="p-4 flex flex-col gap-1">
                {[
                  { to: "#", label: "Jobs" },
                  { to: "#", label: "Hackathons" },
                  { to: "#", label: "Projects" },
                  { to: "#", label: "Tasks" },
                  { to: "#", label: "Organization" },
                ].map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    label={item.label}
                    mobile
                    darkMode={darkMode}
                    onNavigate={closeMobileMenu}
                  />
                ))}
              </nav>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

const NavLink = ({
  to,
  label,
  mobile,
  darkMode,
  onNavigate,
}) => (
  <Link
    to={to}
    onClick={onNavigate}
    className={`
      relative group px-4 py-3 rounded-2xl font-semibold transition-all duration-300 overflow-hidden
      ${
        darkMode
          ? "text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/70 hover:scale-[1.02] hover:-translate-y-0.5"
          : "text-slate-700 hover:text-slate-900 bg-white/60 hover:bg-white"
      }
      ${
        mobile
          ? "border-l-4 border-transparent hover:border-indigo-500 w-full hover:scale-[1.02] hover:-translate-y-0.5"
          : "shadow-lg border border-slate-200/50 dark:border-slate-700/50"
      }
    `}
  >
    <span className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-2xl"></span>
    <span className="relative z-10">{label}</span>
  </Link>
);

const GradientDropdownLink = ({
  to,
  onClick,
  icon,
  label,
  danger,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group flex items-center gap-4 p-5 overflow-hidden transition-all duration-500"
  >
    <span
      className={`absolute inset-0 ${
        danger
          ? "bg-linear-to-r from-rose-500 via-pink-500 to-indigo-500"
          : "bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500"
      } opacity-0 group-hover:opacity-90 transition-all duration-500`}
    />
    <span className="relative z-10 group-hover:text-white transition-all duration-300">
      {icon}
    </span>
    <span className="relative z-10 group-hover:text-white transition-all duration-300">
      {label}
    </span>
  </Link>
);

export default TopNavbar;