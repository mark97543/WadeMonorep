import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick?: () => void; // Add this line to allow the click function
}

export const WadeButton = ({ label, onClick }: ButtonProps) => {
  return (
    <button className={styles.wadeButton} onClick={onClick}>
      {label}
    </button>
  );
};