import styles from './Hamburger.module.css'

interface HamburgerProps {
    isOpen: boolean;
    // Update this line to accept the event
    toggle: (e: React.MouseEvent) => void; 
    className?: string;
}

export const Hamburger = ({ isOpen, toggle, className }: HamburgerProps) => {
  return (
    <button 
      className={`${styles.button} ${isOpen ? styles.open : ''} ${className || ''}`} 
      onClick={(e) => toggle(e)} // Pass the event through
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
    >
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </button>
  );
};