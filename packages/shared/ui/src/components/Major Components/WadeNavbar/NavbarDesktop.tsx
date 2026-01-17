import React from 'react';
import styles from './WadeNavbar.module.css';
import { WadeButton } from '../../Atoms/Button/Button';
import { Dropdown, DropdownItem } from '../../Atoms/Dropdown/DropDown';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  label: string;
  url: string;
  children?: NavItem[]; 
}

interface NavbarDesktopInt {
  brandName: string;
  items?: NavItem[];
  user: any;
  isAdmin?: boolean;
  onLogout: () => void;
  themeData?: any;
}



export const NavbarDesktop = ({ brandName, items = [], isAdmin, user, onLogout, themeData }: NavbarDesktopInt) => {

  const navigate = useNavigate();
  console.log(user)


  return (
    <nav className={styles.navbarDesktopRoot} style={{ 
        backgroundColor: themeData?.surface_color || '#111111', 
        color: themeData?.text_color || 'white',
    }}>
      <div className={styles.container}>
        {/* Brand Section */}
        <div className={styles.brand}>{brandName}</div>
        
        {/* Navigation Mapping */}
        <div className={styles.navLinks}>
          {items.map((item, i) => {
            // If item has children, render the Dropdown molecule
            if (item.children && item.children.length > 0) {
              return (
                <Dropdown 
                  key={i} 
                  /* Visual Indicator: Added ▼ to show it's a menu */
                  trigger={
                    <span className={styles.link}>
                        {item.label} 
                        <span className={styles.desktopIndicator}>▼</span>
                    </span>
                    }
                >
                  {item.children.map((child, ci) => (
                    <DropdownItem key={ci}>
                      <a href={child.url} className={styles.dropdownInnerLink}>
                        {child.label}
                      </a>
                    </DropdownItem>
                  ))}
                </Dropdown>
              );
            }

            // Standard Link
            return (
              <a key={i} href={item.url} className={styles.link}>
                {item.label}
              </a>
            );
          })}

          {/* Auth Section with vertical divider */}
          <div className={styles.authWrapper}>
            {user ? (
              <WadeButton onClick={onLogout} label='Logout' />
            ) : (
              <WadeButton label='Login' onClick={()=>navigate('/login')}/>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};