import styles from './WadeNavbar.module.css'; 
import { WadeButton } from '../../Atoms/Button/Button';
import { Hamburger } from 'src/components/Atoms/HamburgerButton/Hamburger';
import { NavbarDesktop } from './NavbarDesktop';
import {NavbarMobile} from './NavbarMobile'

interface NavItem {
  label: string;
  url: string;
  children?: NavItem[];
}

interface NavbarProps {
  items?: NavItem[];
  brandName: string;
  user: any;
  isAdmin?: boolean;
  onLogout: () => void;
  themeData?: any; 
}

// const dummyItems = [
//   { label: 'Home', url: '/' },
//   { 
//     label: 'Services', 
//     url: '#', // Usually '#' if it's just a dropdown trigger
//     children: [
//       { label: 'Web Design', url: '/services/web' },
//       { label: 'App Development', url: '/services/app' },
//       { label: 'SEO Optimization', url: '/services/seo' },
//     ] 
//   },
//   { 
//     label: 'Company', 
//     url: '#',
//     children: [
//       { label: 'About Us', url: '/about' },
//       { label: 'Our Team', url: '/team' },
//       { label: 'Contact', url: '/contact' },
//     ] 
//   },
//   { label: 'Pricing', url: '/pricing' },
// ];


export const WadeNavbar = ({ items = [], brandName, user, isAdmin, onLogout, themeData }: NavbarProps) => {
  return (
    <>
      <div className={styles.NavbarDesktop}>
        <NavbarDesktop brandName={brandName} items={items} user={user} isAdmin={isAdmin} onLogout={onLogout} themeData={themeData}/>
      </div>

      <div className={styles.NavbarMobile}>
        <NavbarMobile brandName={brandName} items={items} user={user} isAdmin={isAdmin} onLogout={onLogout} themeData={themeData}/>
      </div>
    
    </>
  );
};