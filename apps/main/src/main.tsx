import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WadeAuthProvider } from '@wade-usa/auth';
import { WadeThemeProvider } from '@wade-usa/ui'; 
//import { WadeThemeProvider } from '../../../packages/shared/ui/src/ThemeProvider';
import { WadeProvider, useWade } from '../context/WadeContext'; 
import App from './App';
import './index.css';
import { GlobalStateProvider } from '../context/GlobalStateContext';

/**
 * THE THEME BRIDGE
 * Feeds raw CMS data from the WadeProvider into the WadeThemeProvider
 */
const ThemeBridge = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useWade(); 
  return (
    <WadeThemeProvider themeData={theme}>
      {children}
    </WadeThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WadeAuthProvider >
      <BrowserRouter>
        <WadeProvider>
          <GlobalStateProvider>
            <ThemeBridge>
              <App />
            </ThemeBridge>
          </GlobalStateProvider>
        </WadeProvider>
      </BrowserRouter>
    </WadeAuthProvider>
  </React.StrictMode>
);