/**
 * packages/shared/ui/src/components/Pages/WadeLogin/WadeLogin.tsx
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@wade-usa/auth'; 

export const WadeLogin = () => {
  // 1. Hook into the Auth Provider
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
  try {
    console.log("🔵 [WadeLogin] Attempting login for:", email);
    const res = await login(email, password);
    console.log("🟢 [WadeLogin] SDK Response:", res);
    if (res && res.success) {  
      console.log("🚀 [WadeLogin] Login TRULY successful, redirecting...");
      navigate('/landing'); 
    } else {
      console.warn("🟠 [WadeLogin] Login returned false/error.");
      // Use the error message from the SDK if available, or a default one
      setError(res?.error || 'Invalid email or password');
    }
    } catch (err: any) {
      console.error("Login Error:", err);
      // specific error handling based on Directus error codes could go here
      setError('Invalid email or password'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#1a1a1a', 
      borderRadius: '12px',
      border: '1px solid #333',
      width: '100%',
      maxWidth: '400px',
      color: 'white',
      fontFamily: 'sans-serif',
      margin: '0 auto' // Centers component if used in a flex container
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Member Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#0a0a0a', color: 'white' }}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#0a0a0a', color: 'white' }}
          required
        />
        {error && <p style={{ color: '#ff4d4d', fontSize: '14px', margin: 0 }}>{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px', 
            borderRadius: '6px', 
            border: 'none', 
            backgroundColor: 'var(--primary-color, #00ffcc)', 
            color: 'black',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};