import { useState, useRef, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  SparklesIcon,
  AcademicCapIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

import SkillsModal from "../Pages/Skills/SkillsModal";
import AddExperienceModal from "../Pages/Experience/AddExperienceModal";
import AddEducationModal from "../Pages/Education/AddEducationModal";
import AddCertificationDialog from "../Pages/Certification/AddCertificationDialog";

import DeleteCertificationDialog from "../Pages/Certification/DeleteCertificationDialog";
import DeleteEducationDialog from "../Pages/Education/DeleteEducationDialog";
import DeleteExperienceModal from "../Pages/Experience/DeleteExperienceModal";
import axios from "axios";

const ProfileDetails = () => {

  // ================= ADD MODAL STATES =================
  const [openSkills, setOpenSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  
  const [openExperience, setOpenExperience] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);

  // ================= DELETE MODAL STATES =================
  const [deleteExperienceOpen, setDeleteExperienceOpen] = useState(false);
  const [deleteEducationOpen, setDeleteEducationOpen] = useState(false);
  const [deleteCertificationOpen, setDeleteCertificationOpen] = useState(false);

  // ================= DATA STATES =================
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // ================= SELECTED INDEX FOR EDIT =================
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
  const [selectedCertificationIndex, setSelectedCertificationIndex] = useState(null);

  // ================= MENU STATE =================
  const [activeMenu, setActiveMenu] = useState(null);

  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const certificationRef = useRef(null);

  // ================= CLOSE MENU ON OUTSIDE CLICK =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;

      if (
        experienceRef.current?.contains(target) ||
        educationRef.current?.contains(target) ||
        certificationRef.current?.contains(target)
      ) {
        return;
      }

      setActiveMenu(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    // ================= FETCH SKILLS =================

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(response.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, []);

  // ================= FETCH PROFILE DATA =================
  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [expRes, eduRes, certRes] = await Promise.all([
        axios.get("http://localhost:5000/api/experiences", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/educations", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/certifications", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      // Update state after async calls
      setExperiences(expRes.data);
      setEducations(eduRes.data);
      setCertifications(certRes.data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  fetchData(); // call the async function
}, []);

useEffect(() => {
  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [expRes, eduRes, certRes] = await Promise.all([
        axios.get("http://localhost:5000/api/experiences", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/educations", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/certifications", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setExperiences(expRes.data);
      setEducations(eduRes.data);
      setCertifications(certRes.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  loadProfileData();
}, []);

  // ================= SAVE SKILLS =================
  const saveSkillsToServer = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/skills",
        { skills: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSkills(data);
    } catch (err) {
      console.error("Error saving skills:", err);
    }
  };

  // ================= HANDLERS =================
  const handleEditExperience = (index) => {
    setSelectedExperienceIndex(index);
    setOpenExperience(true);
    setActiveMenu(null);
  };

  const handleEditEducation = (index) => {
    setSelectedEducationIndex(index);
    setOpenEducation(true);
    setActiveMenu(null);
  };

  const handleEditCertification = (index) => {
    setSelectedCertificationIndex(index);
    setOpenCertification(true);
    setActiveMenu(null);
  };

  const handleDeleteExperience = (index) => {
    setSelectedExperienceIndex(index);
    setDeleteExperienceOpen(true);
    setActiveMenu(null);
  };

  const handleDeleteEducation = (index) => {
    setSelectedEducationIndex(index);
    setDeleteEducationOpen(true);
    setActiveMenu(null);
  };

  const handleDeleteCertification = (index) => {
    setSelectedCertificationIndex(index);
    setDeleteCertificationOpen(true);
    setActiveMenu(null);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 mt-4 mb-8">
        {/* LEFT SIDE - Profile Completion & Skills */}
        <div className="flex-1 space-y-6">

          {/* Skills Section - Modern Chips */}
          <div className="group relative bg-linear-to-br from-slate-50/70 to-indigo-50/50 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-2xl hover:shadow-3xl p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute top-4 right-4 w-24 h-24 bg-linear-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl blur-xl -rotate-12 opacity-60"></div>
            <div className="relative flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Skills</h3>
                  <p className="text-sm text-slate-500">{skills.length} skills</p>
                </div>
              </div>
              <button
                onClick={() => setOpenSkills(true)}
                className="group/add-btn relative w-14 h-14 flex items-center justify-center rounded-3xl bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-indigo-400/50 active:scale-95"
              >
                <PlusIcon className="w-6 h-6" />
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur opacity-0 group-hover/add-btn:opacity-100 transition-all duration-500"></div>
              </button>
            </div>

            {skills.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium text-lg">No skills added yet</p>
                <p className="text-sm text-slate-400 mt-1">Add skills to showcase your expertise</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="group/skill inline-flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-indigo-100/80 to-purple-100/80 backdrop-blur-sm text-indigo-800 font-semibold text-sm rounded-2xl border border-indigo-200/60 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:from-indigo-200 hover:to-purple-200"
                  >
                    {skill}
                    <div className="w-2 h-2 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full group-hover/skill:scale-110 transition-transform"></div>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* EXPERIENCE SECTION */}
          <div ref={experienceRef} className="group/card relative bg-linear-to-br from-orange-50/70 via-white to-red-50/50 backdrop-blur-xl border border-orange-200/60 rounded-3xl shadow-2xl hover:shadow-3xl p-8 transition-all duration-500">
            <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 via-red-500/5 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
            <div className="relative flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm7 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Experience</h3>
                  <p className="text-sm text-slate-500">{experiences.length} entries</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenExperience(true);
                  setActiveMenu(null);
                }}
                className="group/add-btn relative w-14 h-14 flex items-center justify-center rounded-3xl bg-linear-to-r from-orange-600 to-red-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-orange-400/50 active:scale-95"
              >
                <PlusIcon className="w-6 h-6" />
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur opacity-0 group-hover/add-btn:opacity-100 transition-all duration-500"></div>
              </button>
            </div>

            {experiences.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-1-4H3m8 0h1" />
                  </svg>
                </div>
                <p className="text-slate-500 font-semibold text-lg mb-1">No experiences yet</p>
                <p className="text-sm text-slate-400">Add your work experience to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <ExperienceItem
                    key={index}
                    experience={exp}
                    isActive={activeMenu === `experience-${index}`}
                    onToggleMenu={() => setActiveMenu(activeMenu === `experience-${index}` ? null : `experience-${index}`)}
                    onEdit={() => handleEditExperience(index)}
                    onDelete={() => handleDeleteExperience(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Experience, Education, Certifications */}
        <div className="flex-1 space-y-6">

          {/* EDUCATION SECTION */}
          <div ref={educationRef} className="group/card relative bg-linear-to-br from-emerald-50/70 via-white to-teal-50/50 backdrop-blur-xl border border-emerald-200/60 rounded-3xl shadow-2xl hover:shadow-3xl p-8 transition-all duration-500">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-teal-500/5 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
            <div className="relative flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <AcademicCapIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Education</h3>
                  <p className="text-sm text-slate-500">{educations.length} degrees</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenEducation(true);
                  setActiveMenu(null);
                }}
                className="group/add-btn relative w-14 h-14 flex items-center justify-center rounded-3xl bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-emerald-400/50 active:scale-95"
              >
                <PlusIcon className="w-6 h-6" />
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur opacity-0 group-hover/add-btn:opacity-100 transition-all duration-500"></div>
              </button>
            </div>

            {educations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-xl">
                  <AcademicCapIcon className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-slate-500 font-semibold text-lg mb-1">No education yet</p>
                <p className="text-sm text-slate-400">Add your academic achievements</p>
              </div>
            ) : (
              <div className="space-y-4">
                {educations.map((edu, index) => (
                  <ExperienceItem
                    key={index}
                    experience={{
                      title: edu.degree,
                      company: edu.institution,
                      startDate: edu.startYear,
                      endDate: edu.endYear || "Present"
                    }}
                    isActive={activeMenu === `education-${index}`}
                    onToggleMenu={() => setActiveMenu(activeMenu === `education-${index}` ? null : `education-${index}`)}
                    onEdit={() => handleEditEducation(index)}
                    onDelete={() => handleDeleteEducation(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CERTIFICATION SECTION */}
          <div ref={certificationRef} className="group/card relative bg-linear-to-br from-purple-50/70 via-white to-pink-50/50 backdrop-blur-xl border border-purple-200/60 rounded-3xl shadow-2xl hover:shadow-3xl p-8 transition-all duration-500">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 via-pink-500/5 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
            <div className="relative flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <TrophyIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Certifications</h3>
                  <p className="text-sm text-slate-500">{certifications.length} achievements</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenCertification(true);
                  setActiveMenu(null);
                }}
                className="group/add-btn relative w-14 h-14 flex items-center justify-center rounded-3xl bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-purple-400/50 active:scale-95"
              >
                <PlusIcon className="w-6 h-6" />
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur opacity-0 group-hover/add-btn:opacity-100 transition-all duration-500"></div>
              </button>
            </div>

            {certifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-xl">
                  <TrophyIcon className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-slate-500 font-semibold text-lg mb-1">No certifications yet</p>
                <p className="text-sm text-slate-400">Add your certifications and badges</p>
              </div>
            ) : (
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <ExperienceItem
                    key={index}
                    experience={{
                      title: cert.name,
                      company: cert.organization,
                      startDate: cert.issueDate,
                      endDate: undefined
                    }}
                    isActive={activeMenu === `certification-${index}`}
                    onToggleMenu={() => setActiveMenu(activeMenu === `certification-${index}` ? null : `certification-${index}`)}
                    onEdit={() => handleEditCertification(index)}
                    onDelete={() => handleDeleteCertification(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= ADD MODALS ================= */}
      <SkillsModal
        open={openSkills}
        onClose={() => setOpenSkills(false)}
        onSave={(data) => {
          saveSkillsToServer(data);
          setOpenSkills(false);
        }}
      />

      <AddExperienceModal
        key={openExperience ? selectedExperienceIndex ?? "new" : "closed-exp"}
        open={openExperience}
        onClose={() => {
          setOpenExperience(false);
          setSelectedExperienceIndex(null);
        }}
        initialData={
          selectedExperienceIndex !== null
            ? {
                role: experiences[selectedExperienceIndex].title,
                company: experiences[selectedExperienceIndex].company,
                location: "",
                doj: experiences[selectedExperienceIndex].startDate,
                doe:
                  !experiences[selectedExperienceIndex].endDate ||
                  experiences[selectedExperienceIndex].endDate === "Present"
                    ? ""
                    : experiences[selectedExperienceIndex].endDate,
                present:
                  !experiences[selectedExperienceIndex].endDate ||
                  experiences[selectedExperienceIndex].endDate === "Present",
              }
            : null
        }
        onAdd={async (data) => {
          try {
            const token = localStorage.getItem("token");

            const experiencePayload = {
              title: data.role,
              company: data.company,
              startDate: data.doj,
              endDate: data.present ? "Present" : data.doe || undefined,
            };

            if (selectedExperienceIndex !== null) {
              await axios.put(
                `http://localhost:5000/api/experiences/${selectedExperienceIndex}`,
                experiencePayload,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            } else {
              await axios.post(
                "http://localhost:5000/api/experiences",
                experiencePayload,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            }

            // ✅ Reload after save
            const expRes = await axios.get(
              "http://localhost:5000/api/experiences",
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setExperiences(expRes.data);

          } catch (err) {
            console.error("Error saving experience:", err);
          }

          setOpenExperience(false);
          setSelectedExperienceIndex(null);
        }}
      />

      <AddEducationModal
        key={openEducation ? selectedEducationIndex ?? "new" : "closed-edu"}
        open={openEducation}
        onClose={() => {
          setOpenEducation(false);
          setSelectedEducationIndex(null);
        }}
        initialData={
          selectedEducationIndex !== null
            ? {
                college: educations[selectedEducationIndex].institution,
                degree: educations[selectedEducationIndex].degree,
                field: "",
                location: "",
                doj: educations[selectedEducationIndex].startYear,
                doe:
                  !educations[selectedEducationIndex].endYear ||
                  educations[selectedEducationIndex].endYear === "Present"
                    ? ""
                    : educations[selectedEducationIndex].endYear,
                studying:
                  !educations[selectedEducationIndex].endYear ||
                  educations[selectedEducationIndex].endYear === "Present",
              }
            : null
        }
        onAdd={async (data) => {
          try {
            const token = localStorage.getItem("token");

            const educationPayload = {
              degree: data.degree,
              institution: data.college,
              startYear: data.doj,
              endYear: data.studying ? "Present" : data.doe || undefined,
            };

            if (selectedEducationIndex !== null) {
              await axios.put(
                `http://localhost:5000/api/educations/${selectedEducationIndex}`,
                educationPayload,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            } else {
              await axios.post(
                "http://localhost:5000/api/educations",
                educationPayload,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            }

            // Refresh education list
            const eduRes = await axios.get(
              "http://localhost:5000/api/educations",
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setEducations(eduRes.data);

          } catch (err) {
            console.error(err);
          }

          setOpenEducation(false);
          setSelectedEducationIndex(null);
        }}
      />


      <AddCertificationDialog
        open={openCertification}
        onClose={() => {
          setOpenCertification(false);
          setSelectedCertificationIndex(null);
        }}
        initialData={
          selectedCertificationIndex !== null
            ? {
                certification: certifications[selectedCertificationIndex].name,
                provider: certifications[selectedCertificationIndex].organization,
                url: "",
                certID: "",
                issuedDate: certifications[selectedCertificationIndex].issueDate,
                expDate: "",
                description: "",
              }
            : null
        }
        onSubmit={async (data) => {
          try {
            const token = localStorage.getItem("token");

            const certificationPayload = {
              name: data.certification,
              organization: data.provider,
              issueDate: data.issuedDate,
            };

            if (selectedCertificationIndex !== null) {
              await axios.put(
                `http://localhost:5000/api/certifications/${selectedCertificationIndex}`,
                certificationPayload,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            } else {
              await axios.post(
                "http://localhost:5000/api/certifications",
                certificationPayload,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            }

            // Refresh certifications
            const certRes = await axios.get(
              "http://localhost:5000/api/certifications",
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setCertifications(certRes.data);

          } catch (err) {
            console.error(err);
          }

          setOpenCertification(false);
          setSelectedCertificationIndex(null);
        }}
      />

      {/* ================= DELETE MODALS ================= */}
      <DeleteExperienceModal
        open={deleteExperienceOpen}
        experienceName={
          selectedExperienceIndex !== null
            ? experiences[selectedExperienceIndex].title
            : ""
        }
        onClose={() => setDeleteExperienceOpen(false)}
        onDelete={async () => {
          try {
            const token = localStorage.getItem("token");

            if (selectedExperienceIndex !== null) {
              await axios.delete(
                `http://localhost:5000/api/experiences/${selectedExperienceIndex}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
            }

            // ✅ Reload after delete
            const expRes = await axios.get(
              "http://localhost:5000/api/experiences",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            setExperiences(expRes.data);

          } catch (err) {
            console.error("Error deleting experience:", err);
          }

          setDeleteExperienceOpen(false);
          setSelectedExperienceIndex(null);
        }}
      />

      <DeleteEducationDialog
        open={deleteEducationOpen}
        institutionName={
          selectedEducationIndex !== null
            ? educations[selectedEducationIndex].institution
            : ""
        }
        onCancel={() => setDeleteEducationOpen(false)}
        onDelete={async () => {
          try {
            const token = localStorage.getItem("token");

            if (selectedEducationIndex !== null) {
              await axios.delete(
                `http://localhost:5000/api/educations/${selectedEducationIndex}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            }

            // Refresh education list
            const eduRes = await axios.get(
              "http://localhost:5000/api/educations",
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setEducations(eduRes.data);

          } catch (err) {
            console.error("Error deleting education:", err);
          }

          setDeleteEducationOpen(false);
          setSelectedEducationIndex(null);
        }}
      />

      <DeleteCertificationDialog
        open={deleteCertificationOpen}
        certificationName={
          selectedCertificationIndex !== null
            ? certifications[selectedCertificationIndex].name
            : ""
        }
        onCancel={() => setDeleteCertificationOpen(false)}
        onDelete={async () => {
          try {
            const token = localStorage.getItem("token");

            if (selectedCertificationIndex !== null) {
              await axios.delete(
                `http://localhost:5000/api/certifications/${selectedCertificationIndex}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
            }

            // Refresh certifications
            const certRes = await axios.get(
              "http://localhost:5000/api/certifications",
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setCertifications(certRes.data);

          } catch (err) {
            console.error("Error deleting certification:", err);
          }

          setDeleteCertificationOpen(false);
          setSelectedCertificationIndex(null);
        }}
      />

    </>
  );
};

// Reusable Experience Item Component
const ExperienceItem = ({ experience, isActive, onToggleMenu, onEdit, onDelete }) => (
  <div className="group/item relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-300/50 transition-all duration-400">
    <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
    <div className="relative flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-xl text-slate-900 group-hover/item:text-indigo-800 transition-colors mb-1">
          {experience.title}
        </h4>
        <p className="font-semibold text-slate-700 mb-2">{experience.company}</p>
        <p className="text-sm text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          {experience.startDate} - {experience.endDate || "Present"}
        </p>
      </div>
      
      {/* Modern Menu Button */}
      <button
        onClick={onToggleMenu}
        className="relative p-2 rounded-2xl bg-slate-100/80 hover:bg-indigo-100 hover:shadow-md hover:scale-105 transition-all duration-300 group-hover/item:opacity-100 opacity-70 z-10"
      >
        <EllipsisVerticalIcon className="w-5 h-5 text-slate-600 group-hover/item:text-indigo-700 transition-colors" />
      </button>
    </div>

    {/* Modern Dropdown Menu */}
    {isActive && (
      <div className="absolute right-2 top-14 w-48 bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
        <div className="divide-y divide-slate-100">
          <button
            onClick={onEdit}
            className="flex items-center gap-3 w-full px-6 py-4 text-slate-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 font-medium transition-all duration-200 hover:translate-x-2"
          >
            <div className="w-10 h-10 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-sm">
              <PencilSquareIcon className="w-5 h-5 text-indigo-600" />
            </div>
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-3 w-full px-6 py-4 text-red-600 hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 hover:text-red-700 font-medium transition-all duration-200 hover:translate-x-2"
          >
            <div className="w-10 h-10 bg-linear-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center shadow-sm">
              <TrashIcon className="w-5 h-5 text-red-600" />
            </div>
            Delete
          </button>
        </div>
      </div>
    )}
  </div>
);

export default ProfileDetails;