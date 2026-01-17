import React from 'react';
//@ts-ignore
import styles from './WadePage.module.css';

export const WadePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </main>
  );
};