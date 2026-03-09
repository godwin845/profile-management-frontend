import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopNavbar from './Navbar/TopNavbar';
import { useSelector } from 'react-redux';
import LoginButton from './Auth/Login';
import RegisterButton from './Auth/Register';
import ProfilePage from './ProfilePage';
import DeleteAccountPage from './Pages/DeleteAccount/DeleteAccountPage';

const App = () => {

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`${isDarkMode ? 'bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-800/50' : 'bg-amber-100'} min-h-screen`}>
      <BrowserRouter>
      <TopNavbar />
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/register" element={<RegisterButton />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/settings/delete-account" element={<DeleteAccountPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App; 