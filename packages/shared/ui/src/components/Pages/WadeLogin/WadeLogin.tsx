import React, { useState } from 'react';

interface WadeLoginProps {
  onLogin: (email: string, pass: string) => Promise<any>;
}

export const WadeLogin = ({ onLogin }: WadeLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const res = await onLogin(email, password);
    
    if (!res.success) {
      setError('Invalid email or password');
    }
    setLoading(false);
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
      fontFamily: 'sans-serif'
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