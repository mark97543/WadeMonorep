import { Hamburger } from '../../Atoms/HamburgerButton/Hamburger';
import { useState, useRef, useEffect } from 'react';
import styles from './WadeNavbar.module.css';

interface NavItem {
  label: string;
  url: string;
  children?: NavItem[]; 
}

interface NavbarMobileInt {
    brandName: string;
    items?: NavItem[];
    user: any;
    isAdmin?: boolean;
    onLogout: () => void;
    themeData?: any;
}

export const NavbarMobile = ({ brandName, items = [], isAdmin, user, onLogout, themeData }: NavbarMobileInt) => {
    const [isOpen, setIsOpen] = useState(false);
    // State to track which sub-menu is currently expanded
    const [expandedItem, setExpandedItem] = useState<string | null>(null); 
    const navAreaRef = useRef<HTMLDivElement>(null);

    // Outside click listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navAreaRef.current && !navAreaRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setExpandedItem(null); // Reset menus when closing
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Toggle sub-menu expansion
    const handleExpand = (e: React.MouseEvent, label: string) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedItem(expandedItem === label ? null : label);
    };

    return (
        <nav 
            ref={navAreaRef} 
            className={styles.navbarMobileRoot}
            style={{ 
                backgroundColor: themeData?.surface_color || '#111111', 
                color: themeData?.text_color || 'white',
            }}
        >
            <div className={styles.container}>
                <div className={styles.brand}>
                    {brandName}
                </div>
                
                <div className={styles.navLinks}>
                    <Hamburger 
                        isOpen={isOpen} 
                        toggle={(e: any) => {
                            e.stopPropagation(); 
                            setIsOpen(!isOpen);
                        }}
                    />
                </div>
            </div>

            {/* MOBILE DRAWER */}
            {isOpen && (
                <div className={styles.mobileDrawer} style={{ backgroundColor: themeData?.surface_color || '#111111' }}>
                    {items.map((item, i) => (
                        <div key={i} className={styles.mobileItemWrapper}>
                            {item.children ? (
                                <>
                                    {/* Parent Item with Sub-menu */}
                                    <div 
                                        className={styles.mobileParentLink} 
                                        onClick={(e) => handleExpand(e, item.label)}
                                    >
                                        <span>{item.label}</span>
                                        <span className={`${styles.chevron} ${expandedItem === item.label ? styles.chevronOpen : ''}`}>
                                            ▼
                                        </span>
                                    </div>

                                    {/* Nested Children (Accordion) */}
                                    {expandedItem === item.label && (
                                        <div className={styles.mobileSubMenu}>
                                            {item.children.map((child, ci) => (
                                                <a key={ci} href={child.url} className={styles.mobileChildLink}>
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Standard Single Link */
                                <a href={item.url} className={styles.mobileParentLink}>
                                    {item.label}
                                </a>
                            )}
                        </div>
                    ))}

                    {/* Mobile Auth/Admin Section */}
                    {isAdmin && <a href="/admin" className={styles.mobileParentLink} style={{color: 'var(--primary-color)'}}>Admin</a>}
                </div>
            )}
        </nav>
    );
}