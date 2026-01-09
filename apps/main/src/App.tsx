import { useEffect, useState } from 'react';
import { client } from '@wade-usa/sdk';
import { WadeThemeProvider, WadeButton } from '@wade-usa/ui';
import { readSingleton } from '@directus/sdk';

// 1. Define what our Theme data looks like
interface ThemeSettings {
  [key:string]: string | any;
}

function App() {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  //const [status, setStatus] = useState("Connecting to Brain...");
  useEffect(() => {
    async function initApp() {
      try {
        // 1. Fetch your Theme Singleton from Directus
        const themeData = await client.request(
          readSingleton('Global_Settings', {
            fields: ['*'],
          })
        );

        // 2. Update state
        setTheme(themeData as ThemeSettings);
        //setStatus(`Online`); // Simplified status
      } catch (err) {
        console.error("Initialization error:", err);
        //setStatus("Brain connection failed.");
      }
    }

    initApp();
  }, []);

  // 5. Loading State (Shows until Directus responds)
  if (!theme) {
    return (
      <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>{status}</h2>
        <p>Ensure your Directus Singleton 'theme_settings' exists and has colors set.</p>
      </div>
    );
  }

  // 6. Main App Render
  return (
    <WadeThemeProvider themeData={theme}>
      <div style={{ 
        padding: '50px', 
        fontFamily: 'sans-serif',
        minHeight: '100vh',
        color: 'var(--brand-primary)' 
      }}>
        <header style={{ borderBottom: '1px solid #eee', marginBottom: '20px' }}>
          <h1>Wade-USA Monolith</h1>
          <p style={{ opacity: 0.7 }}>Status: {status}</p>
        </header>

        <main>
          <section style={{ background: '#5a3c3cff', padding: '30px', borderRadius: '12px' }}>
            <h3>Theme-Driven Component</h3>
            <p>This button gets its color from your Directus Dashboard.</p>
            
            <WadeButton 
              label="Action Button" 
              onClick={() => alert('Handshake Successful!')} 
            />
          </section>
        </main>
      </div>
    </WadeThemeProvider>
  );
}

export default App;