// packages/shared/ui/src/components/WadeNavbar.tsx

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: any[];
  brandName: string;
  user: any;
  isAdmin?: boolean; // New prop
  onLogout: () => void;
}

export const WadeNavbar = ({ items, brandName, user, isAdmin, onLogout }: NavbarProps) => {
  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', padding: '1rem',
      background: '#111', color: 'white', alignItems: 'center' 
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{brandName}</div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {/* 1. Standard Links from CMS */}
        {items.map((link, i) => (
          <a key={i} href={link.url} style={{ color: 'white', textDecoration: 'none' }}>
            {link.label}
          </a>
        ))}

        {/* 2. SECURITY GATE: Only show Admin Panel to Admins */}
        {isAdmin && (
          <a href="/admin" style={{ color: '#00ffcc', fontWeight: 'bold' }}>
            Admin Dashboard
          </a>
        )}

        {/* 3. AUTH GATE: Show Logout if logged in, else nothing (or Login) */}
        {user ? (
          <button onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</button>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
};