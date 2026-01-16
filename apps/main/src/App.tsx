// apps/main/src/App.tsx
import { useEffect, useState } from 'react';

// 1. Shared Logic & Security
import { WadeAuthProvider, useAuth } from '@wade-usa/auth';
import { getSettingsGeneric, registerUser } from '@wade-usa/sdk';

// 2. Shared UI Components
import { 
  WadeThemeProvider, 
  WadeNavbar, 
  WadeLogin, 
  WadeRegister 
} from '@wade-usa/ui';

// 3. Application Config & Pages
import { WADE_CONFIG } from './config';
import Home from './pages/Home';

/**
 * PendingView: Shown when a user is logged in but hasn't been approved yet.
 */
const PendingView = ({ onLogout }: { onLogout: () => void }) => (
  <div style={{ 
    textAlign: 'center', 
    color: 'white', 
    paddingTop: '100px',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: 'sans-serif'
  }}>
    <h1 style={{ color: '#00ffcc', marginBottom: '20px' }}>Account Under Review</h1>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc' }}>
      Thank you for registering! Your account has been created successfully. 
      An administrator needs to approve your access before you can enter the platform.
    </p>
    <button 
      onClick={onLogout}
      style={{ 
        marginTop: '30px', 
        padding: '12px 24px', 
        cursor: 'pointer', 
        background: '#333', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        fontWeight: 'bold'
      }}
    >
      Sign Out
    </button>
  </div>
);

/**
 * AppContent: The main shell of the application.
 */
const AppContent = () => {
  const [theme, setTheme] = useState<any>(null);
  const [navData, setNavData] = useState<any>(null);
  const [appLoading, setAppLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const { 
    user, 
    loading: authLoading, 
    isAdmin, 
    roleLabel, 
    login, 
    logout 
  } = useAuth();

  // Handle the "Register -> Then Login" workflow
  const handleRegistration = async (email: string, pass: string, fName: string, lName: string) => {
    // 1. Create the user in Directus
    const res = await registerUser(email, pass, fName, lName);
    
    if (res.success) {
      // 2. If successful, log them in immediately using the credentials they just made
      await login(email, pass);
      // 3. Close the registration form toggle
      setIsRegistering(false);
    }
    
    return res;
  };

  useEffect(() => {
    async function initApp() {
      const settings = await getSettingsGeneric(WADE_CONFIG.collections.settings);
      
      if (!settings) {
        console.warn("Could not load settings. Using system defaults.");
        // You can set a default "Emergency" theme here if you want
        setTheme({ project_name: "Wade Template", background_color: "#0a0a0a" });
      } else {
        setTheme(settings);
      }
      
      setAppLoading(false);
    }
    initApp();
  }, []);

  if (authLoading || appLoading || !theme) {
    return (
      <div style={{ 
        backgroundColor: '#0a0a0a', color: 'white', height: '100vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'sans-serif'
      }}>
        Initializing {WADE_CONFIG.branding.appName}...
      </div>
    );
  }

  return (
    <WadeThemeProvider themeData={theme}>
      <div className="app-shell" style={{ backgroundColor: 'var(--background-color, #0a0a0a)', minHeight: '100vh' }}>
        
        <WadeNavbar 
          items={navData?.links || []} 
          brandName={WADE_CONFIG.branding.appName} 
          user={user}
          isAdmin={isAdmin}
          onLogout={logout}
        />

        {/* DEBUG STRIP */}
        <div style={{ background: '#222', color: '#00ffcc', padding: '5px', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #333' }}>
          <strong>DEBUG:</strong> {user?.email || 'Guest'} | <strong>Status:</strong> {roleLabel} | <strong>Admin:</strong> {isAdmin ? 'YES' : 'NO'}
        </div>

        <main style={{ padding: '20px' }}>
          {!user ? (
            /* UNAUTHENTICATED VIEW */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
              {isRegistering ? (
                <WadeRegister 
                  onRegister={handleRegistration} 
                  onBackToLogin={() => setIsRegistering(false)} 
                />
              ) : (
                <>
                  <WadeLogin onLogin={login} />
                  <button 
                    onClick={() => setIsRegistering(true)}
                    style={{ 
                      marginTop: '20px', 
                      background: 'none', 
                      border: 'none', 
                      color: '#00ffcc', 
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Don't have an account? Register here
                  </button>
                </>
              )}
            </div>
          ) : (
            /* AUTHENTICATED VIEW */
            roleLabel === "Pending Approval" ? (
              <PendingView onLogout={logout} />
            ) : (
              <Home />
            )
          )}
        </main>

      </div>
    </WadeThemeProvider>
  );
};

export default function App() {
  return (
    <WadeAuthProvider>
      <AppContent />
    </WadeAuthProvider>
  );
}