import React, { useState, useEffect } from "react";
import { PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import SkillsModal from "./SkillsModal";
import { fetchSkills, removeSkill, saveSkills } from "../../services/skillsApi";

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    getSkills();
  }, []);

  const handleSaveSkills = async (newSkills) => {
    try {
      await saveSkills(newSkills);
      setModalOpen(false);
      const data = await fetchSkills();
      setSkills(data);
    } catch (err) {
      console.error("Error saving skills:", err);
    }
  };

  const handleRemoveSkill = async (skill) => {
    try {
      await removeSkill(skill);
      const data = await fetchSkills();
      setSkills(data);
    } catch (err) {
      console.error("Error removing skill:", err);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 mb-12">
        <div className="relative min-h-[280px] bg-gradient-to-br from-slate-50/70 to-indigo-50/50 border border-slate-200/60 rounded-3xl shadow-2xl p-8">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Skills</h3>
                <p className="text-sm text-slate-500">
                  {skills.length} skill{skills.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="w-14 h-14 flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transition"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>

          {/* CONTENT */}
          {skills.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium text-lg">
                No skills added yet
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Add skills to showcase your expertise
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-2xl font-semibold text-sm shadow-sm"
                >
                  {skill}

                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500 hover:text-red-700 text-lg leading-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <SkillsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveSkills}
        initialSkills={skills}
      />
    </>
  );
};

export default SkillsManager;