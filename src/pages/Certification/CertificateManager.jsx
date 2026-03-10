import { useState, useEffect } from "react";
import { PlusIcon, TrophyIcon } from "@heroicons/react/24/outline";
import AddCertificateModal from "./AddCertificationDialog";
import { addCertificate, deleteCertificate, getCertificates, updateCertificate } from "../../services/certificateApi";

const CertificateManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);


  useEffect(() => {
    fetchCertificates();
  }, []);

  // Fetch certificates from server
  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error("Error fetching certificates:", err);
    }
  };

  // Add or Edit certificate
  const handleAddOrEditCertificate = async (data) => {
    try {
      if (editingIndex !== null) {
        const id = certificates[editingIndex]._id;
        await updateCertificate(id, data);
      } else {
        await addCertificate(data);
      }
      setEditingIndex(null);
      setModalOpen(false);
      fetchCertificates();
    } catch (err) {
      console.error("Error saving certificate:", err);
    }
  };

  // Edit click
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  // Delete certificate
  const handleDeleteClick = async (index) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      const id = certificates[index]._id;
      await deleteCertificate(id);
      fetchCertificates();
    } catch (err) {
      console.error("Error deleting certificate:", err);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 mb-12">
        <div className="relative h-70 bg-linear-to-br from-slate-50/70 to-indigo-50/50 border border-slate-200/60 rounded-3xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <TrophyIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Certifications
                </h3>
                <p className="text-sm text-slate-500">
                  {certificates.length} achievement
                  {certificates.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingIndex(null);
                setModalOpen(true);
              }}
              className="w-14 h-14 flex items-center justify-center rounded-3xl bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:scale-105 transition"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>

          {/* CONTENT */}
          {certificates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium text-lg">
                No certifications yet
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Add your certifications and badges
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert, idx) => (
                <div
                  key={cert._id}
                  className="p-5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition group"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-lg">
                        {cert.certification}
                      </h4>

                      <p className="text-sm text-slate-600">
                        {cert.provider} | ID: {cert.certID || "N/A"}
                      </p>

                      <p className="text-xs text-slate-400">
                        Issued: {cert.issuedDate || "N/A"} — Exp:{" "}
                        {cert.expDate || "N/A"}
                      </p>

                      {cert.description && (
                        <p className="text-sm text-slate-600 mt-2">
                          {cert.description}
                        </p>
                      )}

                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline text-sm font-medium"
                        >
                          View Certificate
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleEditClick(idx)}
                        className="px-3 py-1 text-xs bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
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
      <AddCertificateModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmit={handleAddOrEditCertificate}
        initialData={
          editingIndex !== null ? certificates[editingIndex] : null
        }
      />
    </>
  );
};

export default CertificateManager;