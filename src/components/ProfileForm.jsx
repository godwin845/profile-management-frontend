import {
  CameraIcon,
  UserIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const ProfileForm = ({
  open,
  onClose,
  form,
  setForm,
  imageFile,
  setImageFile,
  resumeFile,
  setResumeFile,
  loading,
  onSave,
}) => {
  if (!open) return null;

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleSubmit = () => {
    onSave({ form, imageFile, resumeFile });
  };

  const imagePreview = imageFile
    ? URL.createObjectURL(imageFile)
    : form?.profileImage || "https://via.placeholder.com/150";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-linear-to-br from-slate-900/60 via-indigo-500/30 to-purple-500/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500 max-h-[95vh] overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-xl" />

        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6 border-b border-white/20 dark:border-slate-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-indigo-500/30">
                  <UserIcon className="w-7 h-7 text-white" />
                </div>

                <div>
                  <h2 className="text-3xl font-black bg-linear-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                    {form?.id ? "Edit Profile" : "Create Profile"}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Update your personal information and profile picture
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-3 rounded-3xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700/50 shadow-xl transition"
              >
                <XMarkIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Profile Picture
                </label>

                <div className="relative group w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50 hover:ring-indigo-500/50 transition">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <CameraIcon className="w-8 h-8 text-white" />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Click to upload photo
                </p>
              </div>

              {/* Fields */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    First Name *
                  </label>
                  <input
                    placeholder="First name"
                    value={form.firstName || ""}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="w-full px-5 py-4 mt-2 bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg focus:ring-4 focus:ring-indigo-500/30"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Last Name *
                  </label>
                  <input
                    placeholder="Last name"
                    value={form.lastName || ""}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="w-full px-5 py-4 mt-2 bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg focus:ring-4 focus:ring-indigo-500/30"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    placeholder="Email"
                    value={form.email || ""}
                    disabled
                    className="w-full px-5 py-4 mt-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 rounded-2xl text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Location
                  </label>
                  <input
                    placeholder="Location"
                    value={form.location || ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full px-5 py-4 mt-2 bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-8">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Bio
              </label>

              <textarea
                placeholder="Bio"
                value={form.bio || ""}
                maxLength={500}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={4}
                className="w-full px-5 py-4 mt-2 bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg resize-none"
              />

              <p className="text-xs text-right text-slate-500 mt-1">
                {form.bio ? 500 - form.bio.length : 500}/500
              </p>
            </div>

            {/* Resume */}
            <div className="mt-6">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <DocumentIcon className="w-5 h-5 text-indigo-600" />
                Resume/CV
              </label>

              <input
                type="file"
                accept="application/pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="w-full mt-2 px-5 py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white/70 dark:bg-slate-800 cursor-pointer"
              />

              {resumeFile && (
                <p className="text-xs text-emerald-500 mt-2">
                  ✅ {resumeFile.name || resumeFile.split("/").pop()}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-4 p-8 border-t border-white/20 dark:border-slate-800/50">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-2xl bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || !form.firstName || !form.lastName}
              className="flex-1 px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl hover:scale-[1.02] transition"
            >
              {loading
                ? "Saving..."
                : form?.id
                  ? "Update Profile"
                  : "Create Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
