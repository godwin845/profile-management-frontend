import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../auth/Register';
import LoginPage from '../auth/Login';
import ProfilePage from '../ProfilePage';
import DeleteAccountPage from '../pages/DeleteAccount/DeleteAccountPage';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/settings/delete-account" element={<DeleteAccountPage />} />
    </Routes>
  );
}

export default RoutesConfig;