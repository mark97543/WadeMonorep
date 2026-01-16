import React from 'react';
import styles from './WadeCard.module.css'; // Import the styles object

interface WadeCardProps {
  title: string;
  description: string;
  icon?: string;
}

export const WadeCard = ({ title, description, icon }: WadeCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon || '⚡'}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <button className="wadeButton">Explore</button>
    </div>
  );
};