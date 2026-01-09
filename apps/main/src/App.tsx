import { useEffect, useState } from 'react';
import { client, serverInfo } from '@wade-usa/sdk';
import { WadeThemeProvider, WadeButton } from '@wade-usa/ui';
import { readSingleton } from '@directus/sdk';

// 1. Define what our Theme data looks like
interface ThemeSettings {
  primary_color: string;
  accent_color: string;
}

function App() {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [status, setStatus] = useState("Connecting to Brain...");
  useEffect(() => {

    async function initApp() {
      try {

        // 2. Check the API connection
        const info = await client.request(serverInfo());
        
        // Handle different version response formats safely
        const version = (info as any).project?.version || (info as any).version || "11.x";

        // 3. Fetch your Theme Singleton from Directus
        // Make sure the collection name 'theme_settings' matches your Directus exactly
        const themeData = await client.request(
          readSingleton('Global_Settings', {
            fields: ['*'], // Get every variable you ever create!
          })
        );

        // 4. Update state with the data from the Brain
        setTheme(themeData as ThemeSettings);
        setStatus(`Online: v${version}`);
      } catch (err) {
        console.error("Initialization error:", err);
        setStatus("Brain connection failed. Check CORS or Token.");
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