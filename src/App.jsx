import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import DeleteAccountPage from './Pages/Profile Header/DeleteAccountPage';
import TopNavbar from './Navbar/TopNavbar';
import { useSelector } from 'react-redux';
import LoginButton from './Auth/Login';
import RegisterButton from './Auth/Register';

const App = () => {

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`${isDarkMode ? 'bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-800/50' : 'bg-amber-100'} min-h-screen`}>
      <BrowserRouter>
      <TopNavbar />
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/register" element={<RegisterButton />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/profile/settings/delete-account" element={<DeleteAccountPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;