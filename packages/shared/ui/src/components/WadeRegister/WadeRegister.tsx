import React, { useState } from 'react';

interface RegisterProps {
  onRegister: (email: string, pass: string, fName: string, lName: string) => Promise<any>;
  onBackToLogin: () => void;
}

export const WadeRegister = ({ onRegister, onBackToLogin }: RegisterProps) => {
  const [formData, setFormData] = useState({ email: '', pass: '', confirm: '', fName: '', lName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.pass !== formData.confirm) return setError("Passwords do not match");
            
            setLoading(true);
            setError('');

            // 1. Register the user
            const res = await onRegister(formData.email, formData.pass, formData.fName, formData.lName);
        
        if (res.success) {
            // 2. We don't need to do anything else here! 
            // The App.tsx will handle the login next.
        } else {
            setError(res.error);
            setLoading(false);
        }
    };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem', background: '#1a1a1a', borderRadius: '8px', color: '#fff' }}>
      <h2 style={{ textAlign: 'center' }}>Create Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="First Name" required onChange={e => setFormData({...formData, fName: e.target.value})} />
        <input placeholder="Last Name" required onChange={e => setFormData({...formData, lName: e.target.value})} />
        <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, pass: e.target.value})} />
        <input type="password" placeholder="Confirm Password" required onChange={e => setFormData({...formData, confirm: e.target.value})} />
        
        {error && <p style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{error}</p>}
        
        <button type="submit" disabled={loading} style={{ padding: '0.8rem', background: '#00ffcc', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
        
        <button type="button" onClick={onBackToLogin} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};