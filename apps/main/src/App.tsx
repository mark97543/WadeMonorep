import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // New Imports
import { WadeAuthProvider, useAuth } from '@wade-usa/auth';
import { getItemsGeneric } from '@wade-usa/sdk'; // Ensure this is exported in SDK
import { registerUser } from '@wade-usa/sdk';;
import Home from './pages/Home/Home';
import { WadeNavbar } from '../../../packages/shared/ui/src/components/Major Components/WadeNavbar/WadeNavbar'; //Developement only
import { 
  WadeThemeProvider, 
  //WadeNavbar, 
  WadeLogin, 
  WadeRegister,
  WadePending
} from '@wade-usa/ui';

export default function App() {
  const { user, roleLabel, login, logout, isAdmin, authLoading } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [theme, setTheme] = useState({}); // Start empty (uses defaults)

  // FETCH THEME FROM DIRECTUS
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response: any = await getItemsGeneric('Global_Settings'); 
        
        // Since the log shows response is the object itself:
        if (response && response.id) {
          console.log("🎨 CMS Theme detected, applying now...");
          setTheme(response); 
        } else {
          console.log("⚠️ Received something else:", response);
        }
      } catch (err) {
        console.log("ℹ️ CMS Theme fetch failed, staying on defaults.");
      }
    };
    fetchSettings();
  }, []);

  return (
    <WadeThemeProvider themeData={theme}> 
      {/* Navbar pulls brand name from config or env */}
      <WadeNavbar brandName="Platform Template" user={user} isAdmin={isAdmin} onLogout={logout} items={[]} themeData={theme} />
      
      {/* This is where you place the browser routers  */}

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />}/>

          {/* Pending Routes */}

          {/* Basic Routes */}

          {/* Admin Routes */}

          {/* Combined Routes */}

          {/* 401 page */}

        </Routes>
      </main>



    </WadeThemeProvider>
  );
};

