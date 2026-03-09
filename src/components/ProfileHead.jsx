import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import { UserIcon } from "@heroicons/react/24/solid";
import AddSocialModal from "../Pages/SocialLinks/AddSocialModal";
import CareerVisionModal from "../Pages/CareerVision/CareerVisionModal";
import useSocialLinksManager from "../Pages/SocialLinks/useSocialLinksManager";
import useCareerVisionManager from "../Pages/CareerVision/useCareerVisionManager";
import CareerVisionCard from "../Pages/CareerVision/CareerVisionCard";
import { getProfiles, createProfile, updateProfile } from "../api/profileApi";
const Parent = () => {
  const socialManager = useSocialLinksManager();
  const careerManager = useCareerVisionManager();
  const [profiles, setProfiles] = useState([]);
  const [, setSelectedProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const emptyForm = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    bio: "",
    profileImage: "",
    resumeFile: null,
  };
  const [form, setForm] = useState(emptyForm);

  const fetchProfiles = async () => {
    try {
      const data = await getProfiles();
      setProfiles(data);
    } catch (error) {
      console.error("Error loading profiles", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleOpen = (profile = null) => {
    if (profile) {
      setForm(profile);
      setSelectedProfile(profile);
      setImageFile(null);
      setResumeFile(profile.resumeFile || null);
    } else {
      setForm(emptyForm);
      setSelectedProfile(null);
      setImageFile(null);
      setResumeFile(null);
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("location", form.location);
      formData.append("bio", form.bio);
      
      if (imageFile) formData.append("profileImage", imageFile);
      if (resumeFile) formData.append("resumeFile", resumeFile);
      let savedProfile;
      if (form.id) {
        savedProfile = await updateProfile(form.id, formData);
      } else {
        savedProfile = await createProfile(formData);
      }

      setProfiles((prev) => {
        const index = prev.findIndex((p) => p.id === savedProfile.id);
        if (index >= 0) {
          const copy = [...prev];
          copy[index] = savedProfile;
          return copy;
        }
        return [...prev, savedProfile];
      });

      setOpen(false);
    } catch (error) {
      console.error("Error saving profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto container relative bg-linear-to-br from-slate-50/70 to-indigo-50/50 border border-slate-200/60 rounded-3xl shadow-2xl mt-10">
      {" "}
      {/* Header */}{" "}
      <div className="flex gap-3 items-center">
        {" "}
        <UserIcon className="w-12 h-10 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-2" />{" "}
        <h1 className="text-2xl font-bold">Profile</h1>{" "}
      </div>{" "}
      {/* Create Profile Button */}{" "}
      {profiles.length === 0 && (
        <button
          onClick={() => handleOpen()}
          className="px-6 py-3 mt-10 bg-linear-to-br from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          {" "}
          Create New Profile{" "}
        </button>
      )}{" "}
      {/* Main Layout */}{" "}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {" "}
        {/* LEFT SIDE - Profiles */}{" "}
        <div className="lg:col-span-2 space-y-4">
          {" "}
          {profiles.map((p) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              {" "}
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                {" "}
                <img
                  src={`http://localhost:5000${p.profileImage}`}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover"
                />{" "}
                <div>
                  {" "}
                  <p className="font-semibold text-lg">
                    {" "}
                    {p.firstName} {p.lastName}{" "}
                  </p>{" "}
                  <p className="text-gray-500 text-sm">{p.email}</p>{" "}
                  {p.location && (
                    <p className="text-gray-500 text-sm">
                      {" "}
                      Location: {p.location}{" "}
                    </p>
                  )}{" "}
                  {p.bio && (
                    <p className="text-gray-500 text-sm">Bio: {p.bio}</p>
                  )}{" "}
                  {p.resumeFile && (
                    <a
                      href={`http://localhost:5000${p.resumeFile}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Resume
                    </a>
                  )}{" "}
                </div>{" "}
              </div>{" "}
              <button
                onClick={() => handleOpen(p)}
                className="px-4 py-2 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                {" "}
                Edit{" "}
              </button>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        {/* RIGHT SIDE - Social Links */}{" "}
        <div className="space-y-4">
          {" "}
          {socialManager.socialLinks?.length > 0 && (
            <div className="bg-gray-50 p-5 rounded-xl shadow sticky top-10">
              {" "}
              <h3 className="font-semibold mb-4 text-xl">Social Links</h3>{" "}
              <div className="space-y-3">
                {" "}
                {socialManager.socialLinks.map((s, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg bg-white shadow-sm"
                  >
                    {" "}
                    <span className="font-medium">{s.social}</span>{" "}
                    <div className="flex gap-2">
                      {" "}
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        {" "}
                        Visit{" "}
                      </a>{" "}
                      <button
                        onClick={() => socialManager.handleEditSocial(index)}
                        className="px-2 py-1 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded"
                      >
                        {" "}
                        Edit{" "}
                      </button>{" "}
                      <button
                        onClick={() => socialManager.handleDeleteSocial(s._id)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        {" "}
                        Delete{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {/* Show Options Button */}{" "}
      {profiles.length > 0 && !showOptions && (
        <button
          onClick={() => setShowOptions(true)}
          className="mt-8 px-6 py-3 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition"
        >
          {" "}
          Show Profile Options{" "}
        </button>
      )}{" "}
      {/* Dashboard */}{" "}
      {profiles.length > 0 && showOptions && (
        <div className="mt-10 space-y-6">
          {" "}
          <div className="flex justify-between items-center mb-4">
            {" "}
            <h2 className="text-2xl font-bold">Profile Dashboard</h2>{" "}
            <button
              onClick={() => setShowOptions(false)}
              className="px-3 py-1 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded hover:bg-indigo-500 transition"
            >
              {" "}
              Hide{" "}
            </button>{" "}
          </div>{" "}
          {/* Dashboard Cards */}{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            {/* Social Links */}{" "}
            <div
              onClick={() => {
                socialManager.setEditingSocialIndex(null);
                socialManager.setSocialModalOpen(true);
              }}
              className="cursor-pointer p-5 bg-indigo-600 text-white rounded-xl shadow hover:scale-105 transform transition"
            >
              {" "}
              <h3 className="font-semibold text-lg mb-2">
                {" "}
                {socialManager.socialLinks?.length > 0
                  ? "Manage Social Links"
                  : "Add Social Links"}{" "}
              </h3>{" "}
              <p className="text-sm">
                Connect or update your social profiles.
              </p>{" "}
            </div>{" "}
            {/* Career Vision */}{" "}
            <div
              onClick={() => careerManager.setCareerModalOpen(true)}
              className="cursor-pointer p-5 bg-emerald-600 text-white rounded-xl shadow hover:scale-105 transform transition"
            >
              {" "}
              <h3 className="font-semibold text-lg mb-2">
                {" "}
                {careerManager.careerVision
                  ? "Edit Career Vision"
                  : "Set Career Vision"}{" "}
              </h3>{" "}
              <p className="text-sm">
                {" "}
                Define your short-term and long-term goals.{" "}
              </p>{" "}
            </div>{" "}
            {/* Delete Account */}{" "}
            <Link
              to="/profile/settings/delete-account"
              className="block p-5 bg-red-600 text-white rounded-xl shadow hover:scale-105 transform transition"
            >
              {" "}
              <h3 className="font-semibold text-lg mb-2">
                Delete Account
              </h3>{" "}
              <p className="text-sm">
                {" "}
                Permanently remove your profile and data.{" "}
              </p>{" "}
            </Link>{" "}
          </div>{" "}
          {/* Career Vision Card */}{" "}
          {careerManager.careerVision && (
            <div className="mt-6 flex justify-between items-center">
              {" "}
              <CareerVisionCard
                title={careerManager.careerVision.longTerm}
                shortTerm={careerManager.careerVision.shortTerm}
                field={careerManager.careerVision.field}
                inspiration={careerManager.careerVision.inspiration}
                category={careerManager.careerVision.category}
              />{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
      {/* Profile Form */}{" "}
      <ProfileForm
        open={open}
        onClose={() => setOpen(false)}
        form={form}
        setForm={setForm}
        imageFile={imageFile}
        setImageFile={setImageFile}
        resumeFile={resumeFile}
        setResumeFile={setResumeFile}
        loading={loading}
        onSave={handleSave}
      />{" "}
      {/* Social Modal */}{" "}
      <AddSocialModal
        open={socialManager.socialModalOpen}
        onClose={() => {
          socialManager.setSocialModalOpen(false);
          socialManager.setEditingSocialIndex(null);
        }}
        initialData={
          socialManager.editingSocialIndex !== null
            ? socialManager.socialLinks?.[socialManager.editingSocialIndex]
            : null
        }
        onAdd={socialManager.addOrUpdateSocial}
      />{" "}
      {/* Career Vision Modal */}{" "}
      <CareerVisionModal
        open={careerManager.careerModalOpen}
        onClose={() => careerManager.setCareerModalOpen(false)}
        initialData={careerManager.careerVision}
        onUpdate={(data) => careerManager.setCareerVision(data)}
      />{" "}
    </div>
  );
};
export default Parent;
