import { Routes, Route } from 'react-router-dom';
import { WadeProvider, useWade } from '../context/WadeContext';
//import { WadeNavbar } from '@wade-usa/ui';
import { WadePage } from '../Themes/WadePage';
import Home from './pages/Home/Home';
import { WadeLogin } from '@wade-usa/ui';
import Landing from './pages/Landing/Landing';

//Testing Items to Allow Faster Developement
import { WadeNavbar } from '../../../packages/shared/ui/src/components/Major Components/WadeNavbar/WadeNavbar';


const AppNavbar = () => {
  // Debug: Let's see if the Outer Brain is sending the user
  const { appName, user, isAdmin, onLogout, theme } = useWade();
  
  // LOG THIS: Check your console. Is this an object or null?
  console.log("👤 [App.tsx] User from Context:", user); 

  return (
    <WadeNavbar 
      brandName={appName}
      user={user}
      isAdmin={isAdmin}
      onLogout={onLogout}
      themeData={theme}
    />
  );
};

export default function App() {
  return (
    <> 
      <AppNavbar />
      <WadePage>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<WadeLogin />} />
          <Route path='/landing' element={<Landing />} />
        </Routes>
      </WadePage>
    </>
  );
}