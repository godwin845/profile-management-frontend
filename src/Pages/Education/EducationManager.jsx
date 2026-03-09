import { useEffect, useState } from "react";
import { PlusIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import AddEducationModal from "./AddEducationModal";
import axios from "axios";

const EducationManager = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const res = await axios.get("http://localhost:5000/api/education");
    setEducationList(res.data);
  };

  const handleAddOrEditEducation = async (eduData) => {
    try {
      if (editingIndex !== null) {
        const id = educationList[editingIndex]._id;

        await axios.put(
          `http://localhost:5000/api/education/${id}`,
          eduData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/education",
          eduData
        );
      }

      fetchEducation();
      setEditingIndex(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDeleteClick = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this education?"
    );

    if (!confirmDelete) return;

    try {
      const id = educationList[index]._id;

      await axios.delete(
        `http://localhost:5000/api/education/${id}`
      );

      fetchEducation();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 mb-12">
        <div className="relative h-70 bg-linear-to-br from-slate-50/70 to-indigo-50/50 border border-slate-200/60 rounded-3xl shadow-2xl p-8">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Education
                </h3>
                <p className="text-sm text-slate-500">
                  {educationList.length} degree
                  {educationList.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingIndex(null);
                setModalOpen(true);
              }}
              className="w-14 h-14 flex items-center justify-center rounded-3xl bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-2xl hover:scale-105 transition"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>

          {/* CONTENT */}
          {educationList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium text-lg">
                No education yet
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Add your academic achievements
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {educationList.map((edu, idx) => (
                <div
                  key={edu._id}
                  className="p-5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition group"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">
                        {edu.degree} in {edu.field}
                      </h4>

                      <p className="text-sm text-slate-600">
                        {edu.college} — {edu.location}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {edu.doj} to {edu.studying ? "Present" : edu.doe}
                      </p>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleEditClick(idx)}
                        className="px-3 py-1 text-xs bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
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
      <AddEducationModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingIndex(null);
        }}
        onAdd={handleAddOrEditEducation}
        initialData={
          editingIndex !== null
            ? educationList[editingIndex]
            : null
        }
      />
    </>
  );
};

export default EducationManager;