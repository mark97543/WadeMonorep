/**
 * /root/wade-usa/apps/main/context/WadeContext.tsx
 *
 * REFACTORED to prevent state race conditions.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WADE_CONFIG } from '../src/config';
import { WadeLoader } from '@wade-usa/ui';
import { getItemsGeneric } from '@wade-usa/sdk';
import { useAuth } from '@wade-usa/auth';

interface WadeState {
  theme: any; 
  appName: string;
  user: any;
  isAdmin: boolean;
  isLoading: boolean;
  onLogout: () => void;
}

const WadeContext = createContext<WadeState | undefined>(undefined);

export const WadeProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Get ALL state from the source of truth (useAuth)
  const { user, logout, isAdmin, loading: authIsLoading } = useAuth();
  
  // 2. Keep ONLY app-specific state here
  const [theme, setTheme] = useState({});
  const [appIsLoading, setAppIsLoading] = useState(true);

  // Effect for booting app-level settings (like theme)
  useEffect(() => {
    const boot = async () => {
      try {
        document.title = WADE_CONFIG.page_title.project_name;
        const response: any = await getItemsGeneric('Global_Settings').catch(() => null);
        setTheme(response || {});
      } finally {
        setAppIsLoading(false);
      }
    };
    boot();
  }, []);

  // 3. The new state is composed on every render, not managed by effects
  const composedState: WadeState = {
    theme: theme,
    appName: WADE_CONFIG.branding.appName,
    user: user, // Direct from useAuth
    isAdmin: isAdmin, // Direct from useAuth
    onLogout: logout, // Direct from useAuth
    isLoading: authIsLoading || appIsLoading // App is loading if auth OR settings are loading
  };

  return (
    <WadeContext.Provider value={composedState}>
      {composedState.isLoading ? (
        <div style={{ 
          height: '100vh', 
          width: '100vw', 
          backgroundColor: 'var(--background-color)',
          color: 'var(--primary-color)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
            <WadeLoader label={`Initializing ${composedState.appName}`} />
        </div>
      ) : children}
    </WadeContext.Provider>
  );
};

export const useWade = () => {
  const context = useContext(WadeContext);
  if (!context) throw new Error('useWade must be used within a WadeProvider');
  return context;
};
