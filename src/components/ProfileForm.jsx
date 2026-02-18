import React, { useState, useEffect } from "react";
import axios from "axios";
import { CameraIcon, UserIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ProfileForm = ({
  open,
  onClose,
  initialData,
  userId,
}) => {
  const [form, setForm] = useState(initialData);
  const [resumeFile, setResumeFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(
    initialData?.profileImage || "https://via.placeholder.com/150"
  );

  useEffect(() => {
    setForm(initialData);
    setImagePreview(initialData.profileImage || "https://via.placeholder.com/150");
  }, [initialData, setImagePreview]);

  if (!open) return null;

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result;
      setImagePreview(previewUrl);
      setForm({ ...form, profileImage: previewUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  // POST - create new profile
  const handleCreateProfile = async () => {
    try {
      setLoading(true);

      const postData = new FormData();
      postData.append("firstName", form.firstName);
      postData.append("lastName", form.lastName);
      postData.append("email", form.email);
      postData.append("location", form.location || "");
      postData.append("bio", form.bio || "");

      if (imageFile) postData.append("profileImage", imageFile);
      if (resumeFile) postData.append("resume", resumeFile);

      const response = await axios.post(
        `http://localhost:5000/api/profile`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Profile created successfully!");
        onClose();
      } else {
        alert("Failed to create profile.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create profile!");
    } finally {
      setLoading(false);
    }
  };

  // PUT - update existing profile
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("location", form.location || "");
      formData.append("bio", form.bio || "");

      if (imageFile) formData.append("profileImage", imageFile);
      if (resumeFile) formData.append("resume", resumeFile);

      await axios.put(
        `http://localhost:5000/api/profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  // Decide which action to use (create vs update)
  const handleSubmit = () => {
    if (userId) {
      handleUpdateProfile();
    } else {
      handleCreateProfile();
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-linear-to-br from-slate-900/60 via-indigo-500/30 to-purple-500/30 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500 max-h-[95vh] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-xl" />

        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-6 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-indigo-500/30">
                  <UserIcon className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h2 className="text-3xl font-black bg-linear-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                    {userId ? "Edit Profile" : "Create Profile"}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Update your personal information and profile picture
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group relative p-3 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl hover:bg-white dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                <XMarkIcon className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Image Section */}
              <div className="lg:col-span-1 space-y-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Profile Picture
                </label>
                <div className="relative group">
                  <div className="relative w-32 h-32 mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50 hover:ring-indigo-500/50 transition-all duration-500 hover:scale-105 hover:shadow-3xl bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-900/50">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <CameraIcon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-3xl"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center lg:text-left">
                  Click to upload new photo (JPG, PNG, WebP)
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    value={form.email}
                    disabled
                    className="w-full px-5 py-4 bg-slate-100/70 dark:bg-slate-700/70 backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/60 rounded-2xl text-sm shadow-lg cursor-not-allowed opacity-75"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Location
                  </label>
                  <input
                    value={form.location || ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g., Chennai, Tamil Nadu"
                    className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-3 mt-8 pt-8 border-t border-white/20 dark:border-slate-800/50">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Bio
              </label>
              <div className="relative">
                <textarea
                  value={form.bio || ""}
                  maxLength={500}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Tell us about yourself (max 500 characters)..."
                  rows={4}
                  className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-sm resize-vertical shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 hover:border-indigo-400/50 pr-16 h-32"
                />
                <div className="absolute bottom-4 right-4 text-xs text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-xl backdrop-blur-sm">
                  {form.bio ? 500 - form.bio.length : "0"}/500
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <DocumentIcon className="w-5 h-5 text-indigo-600" />
                Resume/CV (PDF, DOC, DOCX)
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept="application/pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="w-full px-5 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-dashed border-slate-300/60 dark:border-slate-600/60 rounded-2xl text-sm shadow-xl cursor-pointer hover:border-indigo-400/60 focus:border-indigo-500/60 transition-all duration-300 hover:shadow-2xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-slate-800/50 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-slate-700/70"
                />
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </div>
              {resumeFile && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  ✅ {resumeFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 p-8 pt-6 bg-linear-to-t from-white/50 dark:from-slate-900/50 to-transparent border-t border-white/20 dark:border-slate-800/50">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 group relative px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-slate-700 dark:text-slate-300 font-bold rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Cancel</span>
              <div className="absolute inset-0 bg-linear-to-r from-slate-200/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !form.firstName || !form.lastName}
              className="flex-1 group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span>{loading ? (userId ? "Updating..." : "Creating...") : userId ? "Update Profile" : "Create Profile"}</span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;