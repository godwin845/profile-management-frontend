import React, { useState, useEffect } from "react";
import { PlusIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import AddExperienceModal from "./AddExperienceModal";
import axios from "axios";

const ExperienceManager = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/experience"
      );
      setExperiences(res.data);
    } catch (error) {
      console.error("Error fetching experiences", error);
    }
  };

  const handleAddOrEditExperience = async (data) => {
    try {
      if (editingIndex !== null) {
        const id = experiences[editingIndex]._id;

        await axios.put(
          `http://localhost:5000/api/experience/${id}`,
          data
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/experience",
          data
        );
      }

      fetchExperiences();
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving experience", error);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDeleteClick = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmDelete) return;

    try {
      const id = experiences[index]._id;

      await axios.delete(
        `http://localhost:5000/api/experience/${id}`
      );

      fetchExperiences();
    } catch (error) {
      console.error("Error deleting experience", error);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 mb-12">
        <div className="relative h-70 bg-linear-to-br from-slate-50/70 to-orange-50/50 border border-slate-200/60 rounded-3xl shadow-2xl p-8">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <BriefcaseIcon className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Experience
                </h3>

                <p className="text-sm text-slate-500">
                  {experiences.length} entr
                  {experiences.length !== 1 ? "ies" : "y"}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingIndex(null);
                setModalOpen(true);
              }}
              className="w-14 h-14 flex items-center justify-center rounded-3xl bg-linear-to-r from-orange-600 to-red-600 text-white shadow-2xl hover:scale-105 transition"
            >
              <PlusIcon className="w-6 h-6" />
            </button>

          </div>

          {/* CONTENT */}

          {experiences.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium text-lg">
                No experiences yet
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Add your work experience to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {experiences.map((exp, idx) => (
                <div
                  key={exp._id}
                  className="p-5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition group"
                >

                  <div className="flex justify-between items-start">

                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">
                        {exp.role}
                      </h4>

                      <p className="text-sm text-slate-600">
                        {exp.company} |{" "}
                        {exp.location || "Location not specified"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {exp.doj} - {exp.present ? "Present" : exp.doe}
                      </p>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">

                      <button
                        onClick={() => handleEditClick(idx)}
                        className="px-3 py-1 text-xs bg-orange-500 text-white rounded-xl"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteClick(idx)}
                        className="px-3 py-1 text-xs bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* MODAL */}

      <AddExperienceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingIndex(null);
        }}
        onAdd={handleAddOrEditExperience}
        initialData={
          editingIndex !== null
            ? experiences[editingIndex]
            : null
        }
      />
    </>
  );
};

export default ExperienceManager;