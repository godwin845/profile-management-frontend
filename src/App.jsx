import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNavbar from './navbar/TopNavbar';
import RoutesConfig from './routes/RoutesConfig';

const App = () => {

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`${isDarkMode ? 'bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-800/50' : 'bg-amber-100'} min-h-screen`}>
      <BrowserRouter>
        <TopNavbar />
        <RoutesConfig />
      </BrowserRouter>
    </div>
  )
}

export default App;