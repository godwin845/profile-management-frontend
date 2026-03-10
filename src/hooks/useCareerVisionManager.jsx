import { useState, useEffect } from "react";
import {
  createCareerVision,
  getCareerVision,
  updateCareerVision,
} from "../services/careerApi";

const useCareerVisionManager = () => {
  const [careerVision, setCareerVisionState] = useState(null);
  const [careerModalOpen, setCareerModalOpen] = useState(false);

  const fetchCareerVision = async () => {
    try {
      const data = await getCareerVision();
      setCareerVisionState(data);
    } catch (error) {
      console.error("Error fetching career vision", error);
    }
  };

  useEffect(() => {
    fetchCareerVision();
  }, []);

  const setCareerVision = async (data) => {
    try {
      let res;

      if (data?._id) {
        res = await updateCareerVision(data._id, data);
      } else {
        res = await createCareerVision(data);
      }

      setCareerVisionState(res);
    } catch (error) {
      console.error("Error updating career vision", error);
    }
};

  return {
    careerVision,
    careerModalOpen,
    setCareerModalOpen,
    setCareerVision,
  };
};

export default useCareerVisionManager;