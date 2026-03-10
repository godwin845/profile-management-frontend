import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterPage from "../auth/Register";
import LoginPage from "../auth/Login";
import ProfilePage from "../ProfilePage";
import DeleteAccountPage from "../pages/DeleteAccount/DeleteAccountPage";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/settings/delete-account"
        element={
          <PrivateRoute>
            <DeleteAccountPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesConfig;