import React from 'react';

interface WadePendingProps {
  title?: string;
  message?: string;
  onLogout: () => void;
  appName?: string;
}

/**
 * WadePending: A standardized "Gate" screen for users awaiting approval.
 */
export const WadePending = ({ 
  title = "Account Under Review", 
  message = "Thank you for joining! An administrator needs to approve your access before you can enter the platform.",
  onLogout,
  appName = "Platform"
}: WadePendingProps) => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center', 
      color: 'white', 
      padding: '40px 20px',
      maxWidth: '500px',
      margin: '10vh auto',
      fontFamily: 'sans-serif',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        fontSize: '3rem', 
        marginBottom: '20px',
        filter: 'drop-shadow(0 0 10px rgba(0, 255, 204, 0.3))'
      }}>
        ⏳
      </div>
      
      <h1 style={{ color: 'var(--primary-color, #00ffcc)', marginBottom: '16px', fontSize: '1.8rem' }}>
        {title}
      </h1>
      
      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#ccc', marginBottom: '30px' }}>
        {message}
      </p>
      
      <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.1)', marginBottom: '30px' }} />
      
      <button 
        onClick={onLogout}
        style={{ 
          padding: '12px 24px', 
          cursor: 'pointer', 
          background: '#333', 
          color: 'white', 
          border: '1px solid #444', 
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = '#444')}
        onMouseOut={(e) => (e.currentTarget.style.background = '#333')}
      >
        Sign Out of {appName}
      </button>
    </div>
  );
};