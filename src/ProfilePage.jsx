import { useState, useEffect } from 'react';
import ProfileHead from './components/ProfileHead';
import ProfileDetails from './components/ProfileDetails';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with your actual data fetching
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="w-[80%] ml-20 pb-1">
      {loading ? (
        // Tailwind loader
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-gray-200"></div>
        </div>
      ) : (
        <>
          <ProfileHead />
          <ProfileDetails />
        </>
      )}
    </div>
  );
};

export default ProfilePage;