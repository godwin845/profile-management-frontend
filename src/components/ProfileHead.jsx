import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  LinkIcon,
  LightBulbIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import AddSocialModal from "../Pages/Profile Header/AddSocialModal";
import EditSocialModal from "../Pages/Profile Header/EditSocialModal";
import CareerVisionModal from "../Pages/Profile Header/CareerVisionModal";
import CareerVisionCard from "../Pages/Profile Header/CareerVisionCard";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";

const ProfileHead = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [addSocialOpen, setAddSocialOpen] = useState(false);
  const [editSocialOpen, setEditSocialOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [careerData, setCareerData] = useState(null);

  const menuRef = useRef(null);

  const profileExists = !!profileData?._id;

  // ==============================
  // FETCH PROFILE & CAREER DATA
  // ==============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(
          "http://localhost:5000/api/profile"
        );

        if (profileRes.data && profileRes.data._id) {
          setProfileData(profileRes.data);
        }

        const careerRes = await axios.get(
          "http://localhost:5000/api/career-vision"
        );

        if (careerRes.data && careerRes.data._id) {
          setCareerData(careerRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==============================
  // CLOSE DROPDOWN
  // ==============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==============================
  // MENU CLICK
  // ==============================
  const handleMenuClick = (label) => {
    setMenuOpen(false);

    switch (label) {
      case "Create Profile":
      case "Edit Profile":
        setProfileOpen(true);
        break;

      case "Add Socials":
        setAddSocialOpen(true);
        break;

      case "Edit Socials":
        setEditSocialOpen(true);
        break;

      case "Career Vision":
        setCareerOpen(true);
        break;

      case "Settings":
        navigate("/profile/settings/delete-account");
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-5 bg-linear-to-br from-slate-50 to-indigo-50/50 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl p-8 mb-2 hover:shadow-2xl transition-all duration-500">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 gap-6 relative">
        <div className="relative group">
          <div className="absolute -inset-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
          <img
            src={profileData.profileImage || "https://via.placeholder.com/150"}
            alt="profile"
            className="w-28 h-28 lg:w-32 lg:h-32 rounded-3xl object-cover border-4 border-white/80 shadow-2xl ring-4 ring-slate-200/50 group-hover:ring-indigo-500/50 transition-all duration-500 hover:scale-105 hover:-rotate-3"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <h2 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent drop-shadow-lg">
              {profileExists
                ? `${profileData.firstName} ${profileData.lastName}`
                : "No Profile Created"}
            </h2>
          </div>

          {profileExists && profileData.location && (
            <div className="flex items-center gap-2 text-slate-600">
              {profileData.location}
            </div>
          )}
        </div>

        <div className="flex items-center relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative w-14 h-14 flex items-center justify-center rounded-3xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl border border-slate-200/60 hover:border-indigo-300/50 transition-all duration-300 hover:scale-105 hover:rotate-3 active:scale-95"
          >
            <span className="text-xl font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
              ⋮
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-16 w-80 bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-3xl shadow-2xl z-50 overflow-hidden">
              <ul className="py-1 divide-y divide-slate-100">
                {[
                  !profileExists
                    ? { label: "Create Profile", icon: PlusCircleIcon }
                    : { label: "Edit Profile", icon: PencilSquareIcon },

                  ...(profileExists
                    ? [
                        { label: "Add Socials", icon: PlusCircleIcon },
                        { label: "Edit Socials", icon: LinkIcon },
                        { label: "Career Vision", icon: LightBulbIcon },
                      ]
                    : []),

                  { label: "Settings", icon: Cog6ToothIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.label}
                      onClick={() => handleMenuClick(item.label)}
                      className="flex items-center gap-4 px-6 py-4 text-slate-700 hover:bg-indigo-50 cursor-pointer"
                    >
                      <Icon className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {profileExists && profileData.bio && (
        <div className="mt-8 p-6 bg-white/60 rounded-2xl border border-slate-200/50 shadow-lg">
          <p className="text-slate-700 leading-relaxed text-base">
            {profileData.bio}
          </p>
        </div>
      )}

      {profileExists && (
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="p-4 bg-white/50 rounded-2xl border border-slate-200/40 shadow-sm">
            <p className="text-sm text-slate-600 font-medium">
              {profileData.email}
            </p>
          </div>

          {profileData.resume && (
            <a
              href={`http://localhost:5000/${profileData.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm rounded-2xl shadow-lg"
            >
              Download Resume
            </a>
          )}
        </div>
      )}

      {profileExists && careerData && (
        <div className="mt-10">
          <CareerVisionCard
            title={careerData.title}
            shortTerm={careerData.shortTerm}
            field={careerData.field}
            inspiration={careerData.inspiration}
            category={careerData.category}
          />
        </div>
      )}

      {/* MODALS */}
      <ProfileForm
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        initialData={profileData}
        userId={profileData._id || ""}
      />

      <AddSocialModal
        open={addSocialOpen}
        onClose={() => setAddSocialOpen(false)}
      />

      <EditSocialModal
        open={editSocialOpen}
        onClose={() => setEditSocialOpen(false)}
      />

      <CareerVisionModal
        open={careerOpen}
        onClose={() => setCareerOpen(false)}
      />
    </div>
  );
};

export default ProfileHead;