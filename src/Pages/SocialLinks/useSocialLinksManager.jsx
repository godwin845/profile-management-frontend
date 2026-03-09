import { useState, useEffect } from "react";
import {
  getSocialLinks,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../api/socialApi";

const useSocialLinksManager = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [editingSocialIndex, setEditingSocialIndex] = useState(null);

  const fetchSocialLinks = async () => {
    try {
      const data = await getSocialLinks();
      setSocialLinks(data);
    } catch (error) {
      console.error("Error fetching social links", error);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const addOrUpdateSocial = async (data) => {
    try {
      if (editingSocialIndex !== null) {
        const id = socialLinks[editingSocialIndex]._id;
        await updateSocialLink(id, data);
      } else {
        await addSocialLink(data);
      }

      fetchSocialLinks();
      setEditingSocialIndex(null);
      setSocialModalOpen(false);
    } catch (error) {
      console.error("Error saving social link", error);
    }
  };

  const handleEditSocial = (index) => {
    setEditingSocialIndex(index);
    setSocialModalOpen(true);
  };

  const handleDeleteSocial = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this social link?");
    
    if (!confirmDelete) return;

    try {
      await deleteSocialLink(id);
      fetchSocialLinks();
    } catch (error) {
      console.error("Error deleting social link", error);
    }
  };

  return {
    socialLinks,
    socialModalOpen,
    editingSocialIndex,
    setSocialModalOpen,
    setEditingSocialIndex,
    addOrUpdateSocial,
    handleEditSocial,
    handleDeleteSocial,
  };
};

export default useSocialLinksManager;
